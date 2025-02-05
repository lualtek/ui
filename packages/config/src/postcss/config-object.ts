
export const postcssObjConfig = (tokens: Record<string, unknown>) => ({
  plugins: {
    'postcss-import': {},
    'postcss-replace': {
      pattern: /--token\(.*?--(\S+?)\)/gi,
      data: tokens,
    },
    'postcss-custom-media': {},
    'postcss-custom-selectors': {},
    // 'postcss-preset-env': {
    //   stage: 0,
    // },
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
