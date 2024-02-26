import { type TransformTokenManifest, type OrderedPlugins, type FormattedTokenManifest } from './plugin.js';

export interface FormatStepOptions {
  transformedTokens: TransformTokenManifest;
  orderedPlugins: OrderedPlugins;
  outputIDs: string[];
  warnings: string[];
}

export default async function formatStep({ transformedTokens, outputIDs, orderedPlugins }: FormatStepOptions): Promise<FormattdTokenManifest> {
  const output: FormattedTokenManifest = {};
  for (const outputID of outputIDs) {
    output[outputID] = {};
  }
  return output;
}
