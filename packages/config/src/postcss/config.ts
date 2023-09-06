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
