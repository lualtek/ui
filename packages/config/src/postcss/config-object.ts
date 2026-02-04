import path from 'node:path';

/**
 * Custom resolver for postcss-import that uses Node's require.resolve
 * to handle package.json "exports" field (e.g., @lualtek/themes/web).
 * Falls back to path-based resolution for non-exported paths.
 */
function resolveId(id: string, basedir: string) {
  // For relative imports, resolve from basedir
  if (id.startsWith('.')) {
    return path.resolve(basedir, id);
  }

  // Try require.resolve first (handles package.json exports)
  try {
    return require.resolve(id, { paths: [basedir] });
  } catch {
    // Fall back: resolve as a file path within node_modules
    // This handles paths like @lualtek/react-components/dist/core/utils/media.css
    const nodeModulesPath = path.resolve(process.cwd(), 'node_modules', id);
    return nodeModulesPath;
  }
}

export const postcssObjConfig = (tokens: Record<string, unknown>) => {
  type TokenType = keyof typeof tokens
  const tokenFunction = (token: `--${TokenType}`) => {
    const tokenName: TokenType = token.replace('--', '');
    return tokens[tokenName];
  };

  return {
    plugins: {
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

export const postcssObjBundlerConfig = (tokens: Record<string, unknown>) => {
  const baseConfig = postcssObjConfig(tokens);

  return {
    plugins: {
      'postcss-import': {
        resolve: resolveId,
      },
      'postcss-url': {
        url: 'rebase',
      },
      ...baseConfig.plugins,
    },
  };
};
