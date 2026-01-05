/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

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
          removeMetadata: false,
        },
      },
    },
    'removeStyleElement',
    'convertStyleToAttrs',
    {
      name: 'removeAttrs',
      params: {
        preserveCurrentColor: true,
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
