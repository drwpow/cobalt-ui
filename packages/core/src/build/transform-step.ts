import { type OrderedPlugins, type TransformTokenManifest } from './plugin.js';
import { type ParsedTokenManifest } from '../parse/index.js';

export interface TransformStepOptions {
  tokens: ParsedTokenManifest;
  orderedPlugins: OrderedPlugins;
  warnings: string[];
}

export function createTransformTokenManifest(tokens: ParsedTokenManifest): TransformTokenManifest {
  const output: TransformTokenManifest = {};
  const modesByType: Record<string, string[] | undefined> = {};

  // 1st pass: collect all modes by $type
  for (const id in tokens) {
    const token = tokens[id]!;
    if (token.$extensions.mode && Object.keys(token.$extensions.mode).length) {
      for (const mode in token.$extensions.mode) {
        if (!modesByType[token.$type]) {
          modesByType[token.$type] = [];
        }
        if (!modesByType[token.$type]!.includes(mode)) {
          modesByType[token.$type]!.push(mode);
        }
      }
    }
  }

  // 2nd pass: build transformed values
  for (const id in tokens) {
    const token = tokens[id]!;
    output[id] = {
      '.': { token, transformedValue: token.$value },
    };
    for (const mode of modesByType[token.$type] ?? []) {
      output[id]![mode] = {
        token,
        transformedValue: token.$extensions?.mode?.[mode] ?? token.$value,
      };
    }
  }
  return output;
}

export default async function transformStep({ tokens, orderedPlugins }: TransformStepOptions): Promise<TransformTokenManifest> {
  let output = createTransformTokenManifest(tokens);
  for (const step of orderedPlugins) {
    for (const plugin of step) {
      if (!plugin.transform) {
        continue;
      }
      try {
        output = await plugin.transform({ tokens: output });
      } catch (err) {
        throw new Error(`[${plugin.name}] ${err}`);
      }
    }
  }
  return output;
}
