
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

export const postcssObjConfig = (tokens: Record<string, unknown>) => {
  type TokenType = keyof typeof tokens
  const tokenFunction = (token: `--${TokenType}`) => {
    const tokenName: TokenType = token.replace('--', '');
    return tokens[tokenName];
  };

  return {
    plugins: {
      'postcss-import': {},
      'postcss-functions': {
        functions: {
          '--token': tokenFunction,
        },
      },
      'postcss-custom-media': {},
      'postcss-custom-selectors': {},
      cssnano: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
          },
          {
            calc: false,
          },
        ],
      },
    },
  };
};
