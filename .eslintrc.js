module.exports = {
  extends: ['@lasalefamine/eslint-config', '@lasalefamine/eslint-config/hooks'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  // Disable extraneous deps for monorepo incompatibility
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'react/require-default-props': 'off',
  },
};
