/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export const postcssConfig = (tokens: Record<string, unknown>) => ({
  plugins: {
    'postcss-import': {},
    'postcss-replace': {
      pattern: /token\(.*?--([^\s]+?)\)/gi,
      data: tokens,
    },
    'postcss-mixins': {},
    'postcss-preset-env': {
      stage: 0,
      features: {
        'logical-properties-and-values': false,
        'prefers-color-scheme-query': false,
        'oklab-function': false,
        'gap-properties': false,
        'cascade-layers': false,
        'nesting-rules': false,
      },
    },
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
