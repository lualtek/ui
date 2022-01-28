// eslint-disable-next-line import/no-extraneous-dependencies
import postcssMixins from 'postcss-mixins';

export const postcssConfig = (envs: Record<string, unknown>) => ({
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 0,
      importFrom: [{
        environmentVariables: envs,
      }],
      features: {
        'logical-properties-and-values': false,
        'prefers-color-scheme-query': false,
        'gap-properties': false,
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
