/** @type {import('stylelint').Config} */
export default {
  plugins: ['stylelint-design-tokens-plugin'],
  extends: ['stylelint-config-equinusocio'],
  rules: {
    'import-notation': 'string',
    'no-descending-specificity': null,
    'designtokens/check': [true, './packages/tokens/platforms/web/tokens.json'],
    /**
     * This rule is disabled because it is not compatible with postcss custom functions but is important for standard CSS
     */
    'declaration-property-value-no-unknown': null,
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['token'],
      },
    ],
  },
  ignoreFiles: [
    '!**/*.css',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    'node_modules',
  ],
};
