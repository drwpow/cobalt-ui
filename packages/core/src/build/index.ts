import type { ResolvedConfig } from '../config/index.js';
import type { ParsedToken } from '../token.js';
import buildStep from './build-step.js';
import formatStep from './format-step.js';
import { PluginOrder, type Plugin, type OrderedPlugins } from './plugin.js';
import transformStep from './transform-step.js';

export type { BuildHookOptions, ConfigHookOptions, FormatHookOptions, FormatToken, FormatTokenManifest, OutputIDToDefaultFilenameMap, Plugin, TransformedToken, TransformHookOptions, TransformTokenManifest } from './plugin.js';

export interface BuildOptions {
  config: ResolvedConfig;
  tokens: { [tokenID: string]: ParsedToken };
  plugins: Plugin[];
}

export interface BuildResult {
  warnings?: string[];
  errors?: string[];
  result: {
    [format: string]: string;
  };
}

export default async function build({ config, tokens, plugins }: BuildOptions): Promise<BuildResult> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const result: BuildResult = { result: {} };

  const registeredPlugins: {
    [outputID: string]: Plugin;
  } = {};

  const orderedPlugins: OrderedPlugins = [
    [], // pre
    [], // registered output
    [], // default
    [], // post
  ];

  try {
    // pre-pass: config / enforce / registerOutput
    for (const plugin of plugins) {
      if (!plugin) {
        continue; // don’t even warn; just silently skip
      }
      if (!plugin.name) {
        errors.push(`Plugin missing name. Exiting.`);
        result.errors = errors;
        return result;
      }
      if (plugin.config) {
        plugin.config({ config, tokens });
      }
      if (plugin.registerOutput) {
        const output = plugin.registerOutput();
        for (const id in output) {
          if (registeredPlugins[id] && registeredPlugins[id]?.name !== plugin.name) {
            errors.push(`Output ID "${id}" already registered by ${registeredPlugins[id]}`);
            result.errors = errors;
            return result;
          }
          registeredPlugins[id] = plugin;
        }
        if (plugin.enforce) {
          if (plugin.enforce === 'pre') {
            orderedPlugins[PluginOrder.Pre].push(plugin);
          } else {
            warnings.push(`Plugins ${plugin.name} registered an output with \`enforce: ${plugin.enforce}\`, which will be ignored.`);
            orderedPlugins[PluginOrder.Registered].push(plugin);
          }
        } else {
          orderedPlugins[PluginOrder.Registered].push(plugin);
        }
      } else {
        orderedPlugins[
          {
            pre: PluginOrder.Pre,
            default: PluginOrder.Default,
            post: PluginOrder.Post,
          }[plugin.enforce || 'default']
        ].push(plugin);
      }
    }

    if (!Object.keys(registeredPlugins).length) {
      throw new Error(`[core] No outputs registered with registerOutput. Nothing to build.`);
    }

    // transform step
    const transformedTokens = await transformStep({ tokens, orderedPlugins, warnings });

    // format step
    const formattedTokens = await formatStep({ transformedTokens, orderedPlugins, warnings });

    // build step
    result.result = await buildStep({ formattedTokens, registeredPlugins, warnings });
  } catch (err) {
    errors.push(String(err));
  }

  if (warnings.length) {
    result.warnings = warnings;
  }
  if (errors.length) {
    result.errors = errors;
  }

  return result;
}
