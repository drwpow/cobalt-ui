import { type FormatTokenManifest, type Plugin } from './plugin.js';

export interface BuildStepOptions {
  formattedTokens: FormatTokenManifest;
  registeredPlugins: { [output: string]: Plugin };
  warnings: string[];
}

export interface FileBuilder {
  build: (output: string) => Promise<string>;
}

export default async function buildStep({ formattedTokens, registeredPlugins, warnings }: BuildStepOptions): Promise<Record<string, string>> {
  const buildResult: Record<string, string> = {};
  await Promise.all(
    Object.keys(registeredPlugins).map(async (outputID) => {
      const plugin = registeredPlugins[outputID];
      if (!plugin) {
        throw new Error(`Output target ${outputID} can’t be built as no plugin registered it.`);
      }
      if (typeof plugin.build !== 'function') {
        throw new Error(`Plugin ${plugin.name} missing build hook to generate output.`);
      }
      const result = await plugin.build({ outputID, tokens: formattedTokens });
      if (!result) {
        warnings.push(`Plugin ${plugin.name}’s build hook generated empty output.`);
      }
      buildResult[outputID] = result;
    }),
  );
  return buildResult;
}
