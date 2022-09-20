/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import postcssMixins from 'postcss-mixins';

export const postcssConfig = (tokens: Record<string, unknown>) => ({
  plugins: {
    'postcss-import': {},
    'postcss-replace': {
      pattern: /token\(.*?--([^\s]+?)\)/gi,
      data: tokens,
    },
    'postcss-preset-env': {
      stage: 0,
      features: {
        'logical-properties-and-values': false,
        'prefers-color-scheme-query': false,
        'gap-properties': false,
        'cascade-layers': false,
      },
      insertAfter: {
        'custom-media-queries': postcssMixins,
      },
    },
    'postcss-mixins': {},
    cssnano: {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    },
  },
});
