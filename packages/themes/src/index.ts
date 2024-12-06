/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import fs from 'fs-extra';
import StyleDictionary from 'style-dictionary';
import type { Config } from 'style-dictionary/types';

import LightDark from './transformers/light-dark.ts';
// import cssLightDark from './transformers/light-dark.ts';
import OkLCH from './transformers/oklch.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// type ThemeVariants = typeof THEME_VARIANTS[number];
// const THEME_VARIANTS = ['light', 'dark'] as const;

/**
 * Generate config for each theme folder
 * and each variant name (eg: light/dark)
 * */
const getConfig = (name: string): Config => ({
  source: [`./src/themes/${name}/*.json`],
  include: [
    // Inject raw tokens to be used in the transformation/references
    '../tokens/platforms/raw/tokens.json',
  ],
  platforms: {
    // Build configuration for the web platform
    web: {
      basePxFontSize: 18,
      buildPath: 'platforms/web/',
      transformGroup: 'css',
      transforms: [
        'color/oklch',
        'css/light-dark',
      ],
      files: [
        {
          format: 'css/variables',
          destination: `${name}.css`,
        },
        {
          format: 'json/flat',
          destination: `${name}.json`,
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
const availableThemes = fs.readdirSync(path.join(__dirname, 'themes')).filter(
  file => fs.statSync(path.join(__dirname, 'themes', file)).isDirectory(),
);

/**
 * For each folder inside themes and for each variant (dark, light) just create
 * style dictionary configuration and run the build
 */
availableThemes.forEach(async (theme) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const SDWithConfig = new StyleDictionary(getConfig(theme));

  /**
   * Register custom transformers to process token values for
   * the web platform
   */
  SDWithConfig.registerTransform(OkLCH);
  SDWithConfig.registerTransform(LightDark);

  /**
   * Manually run StyleDictionary for all the configured platforms
   */
  console.clear();
  await SDWithConfig.hasInitialized;
  await SDWithConfig.buildAllPlatforms();
});
