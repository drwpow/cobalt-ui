import { type ParseOptions } from '../parse/index.js';

export interface ResolvedConfig extends ParseOptions {
  tokens: URL[];
  outDir: URL;
  plugins: Plugin[];
}

export interface Config extends Partial<ParseOptions> {
  /** path to tokens.json (default: "./tokens.json") */
  tokens?: string | string[];
  /** output directory (default: "./tokens/") */
  outDir?: string;
  /** specify plugins */
  plugins: Plugin[];
}
