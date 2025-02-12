
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
        ],
      },
    },
  };
};
