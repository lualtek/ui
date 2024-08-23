/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console, no-restricted-syntax */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import fs from 'fs-extra';
import StyleDictionary from 'style-dictionary';
import type { Config } from 'style-dictionary/types';

import OkLCH from './transformers/oklch.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type ThemeVariants = typeof THEME_VARIANTS[number];
const THEME_VARIANTS = ['light', 'dark'] as const;

/**
 * Generate config for each theme folder
 * and each variant name (eg: light/dark)
 * */
const getConfig = (name: string, variant: ThemeVariants): Config => ({
  source: [`./src/themes/${name}/${variant}/*.json`],
  include: [
    // Inject raw tokens to be used in the transformation/references
    '../tokens/platforms/raw/tokens.json',
  ],
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
 * Get all the folders inside the foldeer `themes` (eg, default, pro etc)
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const SDWithConfig = new StyleDictionary(getConfig(theme, themeVariant));

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
