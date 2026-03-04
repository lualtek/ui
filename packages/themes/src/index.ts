import path from 'node:path';
import { fileURLToPath } from 'node:url';

import fs from 'fs-extra';
import StyleDictionary from 'style-dictionary';
import type { Config, TransformedToken } from 'style-dictionary/types';

import LightDark from './transforms/light-dark.ts';

const Filename = fileURLToPath(import.meta.url);
const Dirname = path.dirname(Filename);

// type ThemeVariants = typeof THEME_VARIANTS[number];
// const THEME_VARIANTS = ['light', 'dark'] as const;

/**
 * Generate config for each theme folder
 * and each variant name (eg: light/dark)
 * */
const getConfig = (name: string): Config => ({
  source: [`src/themes/${name}/*.json`],
  include: ['../tokens/src/configs/**/*.json'],
  log: {
    verbosity: 'verbose', // Set to 'debug' for more verbose output
  },
  platforms: {
    // Build configuration for the web platform
    web: {
      basePxFontSize: 18,
      buildPath: 'platforms/web/',
      transformGroup: 'css',
      transforms: [
        /**
         * Custom transformer
         * @see ./transformers/light-dark.ts
         */
        'css/light-dark',
      ],
      files: [
        {
          format: 'css/variables',
          destination: `${name}.css`,
          // Exclude referenced tokens from the themes files
          filter: (token: TransformedToken) => token.filePath.includes(`src/themes/${name}`),
        },
        {
          format: 'json/flat',
          destination: `${name}.json`,
          // Exclude referenced tokens from the themes files
          filter: (token: TransformedToken) => token.filePath.includes(`src/themes/${name}`),
        },
      ],
      options: {
        showFileHeader: true,
        fileHeader: (defaultMessage: string[] = []) => [
          ...defaultMessage,
          '© Lualtek Srl. All rights reserved. Developed by Mattia Astorino.',
        ],
      },
    },
  },
});

/**
 * Get all the folders inside the foldeer `themes` (eg, default, pro etc)
 */
const themesDir = path.join(Dirname, 'themes');
const availableThemes = fs.readdirSync(themesDir).filter((item) => {
  const itemPath = path.join(themesDir, item);
  return fs.existsSync(itemPath) && fs.statSync(itemPath).isDirectory();
});

/**
 * For each folder inside themes and for each variant (dark, light) just create
 * style dictionary configuration and run the build
 */
availableThemes.forEach(async (theme) => {
  const SDWithConfig = new StyleDictionary(getConfig(theme));

  /**
   * Register custom transformers to process token values for
   * the web platform
   */
  SDWithConfig.registerTransform(LightDark);

  /**
   * Manually run StyleDictionary for all the configured platforms
   */
  console.clear();
  await SDWithConfig.hasInitialized;
  await SDWithConfig.buildAllPlatforms();
});
