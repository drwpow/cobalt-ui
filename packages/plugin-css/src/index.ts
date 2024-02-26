import { type Plugin } from '@cobalt-ui/core';

export interface PluginCSSOptions {
  /** Filename this should output */
  filename?: string;
}

export default function plugin(options: PluginCSSOptions): Plugin {}
