/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console, no-restricted-syntax */
import { createRequire } from 'node:module';
import path from 'node:path';

import fs from 'fs-extra';
import StyleDictionary from 'style-dictionary';
import type { Config, DesignTokens } from 'style-dictionary/types';
import { fileURLToPath } from 'url';

import OkLCH from './transformers/oklch.ts';

const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const RawColorTokens = require('@lualtek/tokens/platforms/raw/tokens.json');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type ThemeVariants = typeof THEME_VARIANTS[number];
const THEME_VARIANTS = ['light', 'dark'] as const;

/**
 * Generate config for each theme folder
 * and each variant name (eg: monochrome/dark)
 * */
const getConfig = (name: string, variant: ThemeVariants): Config => ({
  source: [`./src/themes/${name}/${variant}/*.json`],
  tokens: {
    ...RawColorTokens as DesignTokens,
  },
  platforms: {
    // Build configuration for the web platform
    web: {
      basePxFontSize: 18,
      buildPath: `platforms/web/${name}/`,
      transformGroup: 'custom-web',
      files: [
        {
          format: 'css/variables',
          destination: `${variant}.css`,
        },
        {
          format: 'json/flat',
          destination: `${variant}.json`,
        },
      ],
      options: {
        showFileHeader: true,
        fileHeader: (defaultMessage: string[]) => [
          ...defaultMessage,
          '© Lualtek Srl. All rights reserved. Developed by Mattia Astorino.',
        ],
      },
    },
  },
});

/**
 * Get all the folders inside the foldeer `themes` (eg, default, monochrome etc)
 */
const availableThemes = fs.readdirSync(path.join(__dirname, 'themes')).filter(
  file => fs.statSync(path.join(__dirname, 'themes', file)).isDirectory(),
);

/**
 * For each folder inside themes and for each variant (dark, light) just create
 * style dictionary configuration and run the build
 */
for (const theme of availableThemes) {
  for (const themeVariant of THEME_VARIANTS) {
    const SDWithConfig = new StyleDictionary(
      getConfig(theme, themeVariant),
    );

    /**
   * Register custom transformers to process token values for
   * the web platform
   */
    SDWithConfig.registerTransform(OkLCH);

    /**
   * Add the custom transformers to a new transformGroup `custom-web`
   * used inside getConfig
   */
    SDWithConfig.registerTransformGroup({
      name: 'custom-web',
      transforms: [
        'attribute/cti',
        'name/kebab',
        'time/seconds',
        'html/icon',
        'size/rem',
        'color/oklch',
      ],
    });

    /**
   * Manually run StyleDictionary for all the configured platforms
   */
    console.clear();
    await SDWithConfig.hasInitialized;
    await SDWithConfig.buildAllPlatforms();
  }
}
