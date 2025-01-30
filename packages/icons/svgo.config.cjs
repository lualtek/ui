/**
 * @type {import('svgo').Config}
 */
module.exports = {
  multipass: true,
  js2svg: {
    pretty: false,
  },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: {
            minify: true,
          },
          cleanupNumericValues: {
            floatPrecision: 2,
          },
          convertColors: {
            names2hex: true,
            rgb2hex: true,
          },
          removeViewBox: false,
          removeMetadata: false,
        },
      },
    },
    'removeStyleElement',
    {
      name: 'removeAttrs',
      params: {
        attrs: [
          '*:fill:#000000',
          '*:fill:black',
          '*:fill:#000',
          '*:fill:none',
        ],
      },
    },
  ],
};
