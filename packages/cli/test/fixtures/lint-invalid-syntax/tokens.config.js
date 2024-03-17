import a11y from '../../../../lint-a11y/dist/index.js';
import pluginJS from '../../../../plugin-js/dist/index.js';

/** @type {import('@cobalt-ui/core').Config} */
export default {
  tokens: '../../../../../examples/radix/tokens.yaml',
  plugins: [a11y(), pluginJS()],
  lint: {
    build: { enabled: false },
    rules: {
      'a11y/contrast': {
        checks: [
          {
            tokens: {
              background: 'color.primitive.tomato.2',
              foreground: 'color.primitive.tomato.5',
            },
          },
        ],
      },
    },
  },
};
