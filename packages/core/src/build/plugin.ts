import { type ParsedToken } from '../token.js';
import { type ResolvedConfig } from '../config';
import { type ParsedTokenManifest } from '../parse/index.js';

/**
 * Mapping of output ID → default filename. Note that a user may change the end
 * filename. IDs are a shorter way to refer to a filename, so make them
 * deterministic and predictable.
 */
export type OutputIDToDefaultFilenameMap = {
  [id: string]: string;
};

export interface ConfigHookOptions {
  config: ResolvedConfig;
  tokens: ParsedTokenManifest;
}

export type TransformedToken<T extends ParsedToken = ParsedToken> = { token: T; transformedValue: T['$value'] };

export interface TransformedTokenManifest {
  [tokenID: string]: {
    [modeName: string]: TransformedToken;
  };
}

export interface TransformHookOptions {
  tokens: TransformedTokenManifest;
}

export type FormattedToken<T extends ParsedToken = ParsedToken> = TransformedToken<T> & { formattedValue: string };

export interface FormattedTokenManifest {
  [outputID: string]: {
    [tokenID: string]: {
      [modeName: string]: FormattedToken;
    };
  };
}

export interface FormatHookOptions {
  /** ID of registered output */
  outputID: string;
  tokens: FormattedTokenManifest;
}

export interface BuildHookOptions {
  /** ID of a registered output */
  outputID: string;
  tokens: FormattedTokenManifest;
}

export interface Plugin {
  /** The name of this plugin */
  name: string;
  /**
   * (optional) Move the plugin execution order.
   * - `pre`: executes before the default ordering
   * - `post`: execute after the default ordering
   * By default, plugins execute in array order, but with output-registering plugins running first.
   */
  enforce?: 'pre' | 'post';
  /**
   * Hook that runs before any transformations, for plugins to see what a
   * user’s final config was, and the original (parsed) tokens.
   */
  config?: (configOptions: ConfigHookOptions) => void;
  /**
   * Register an output format.
   *
   * A plugin that registers an output will run before other plugins that choose
   * to modify that output, and will get final control over the final file. Most
   * plugins will only register one output (e.g. CSS), but some plugins may have
   * multiple (e.g. JS + TS).
   *
   * A plugin that doesn’t register any outputs may only modify existing outputs
   * (e.g. transforms).
   */
  registerOutput?: () => OutputIDToDefaultFilenameMap;
  /**
   * Apply any global transformations on token values, if any.
   */
  transform?: (transformOptions: TransformHookOptions) => TransformTokenManifest | Promise<TransformTokenManifest>;
  /**
   * Format original values into format-specific values.
   */
  format?: (formatOptions: FormatHookOptions) => FormatTokenManifest | Promise<FormatTokenManifest>;
  /**
   * Convert the transformed values into a final output format. Only the plugin
   * that registered an output can declare a build.
   */
  build?: (buildOptions: BuildHookOptions) => string | Promise<string>;
}

export type OrderedPlugins = [Plugin[], Plugin[], Plugin[], Plugin[]];

export enum PluginOrder {
  Pre,
  Registered,
  Default,
  Post,
}
