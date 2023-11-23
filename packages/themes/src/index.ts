/* eslint-disable no-console, no-restricted-syntax */
import CompiledColorTokens from '@lualtek/tokens/platforms/raw/tokens.json';
import fs from 'fs-extra';
import path from 'path';
import StyleDictionary from 'style-dictionary';

import OkLCH from './transformers/oklch';

const THEME_VARIANTS = ['light', 'dark'] as const;

/**
 * Generate config for each theme folder
 * and each variant name (eg: monochrome/dark)
 * */
const getConfig = (name: string, variant: string) => ({
  source: [`./src/themes/${name}/${variant}/*.json`],
  tokens: {
    ...CompiledColorTokens,
  },
  platforms: {
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
          '© Lualtek Srl. All rights reserved.',
        ],
      },
    },
  },
});

/**
 * Get all the folders inside the foldeer `themes` (eg, default, monochrome etc)
 */
const themes = fs.readdirSync(path.join(__dirname, 'themes')).filter(
  file => fs.statSync(path.join(__dirname, 'themes', file)).isDirectory(),
);

/**
 * For each folder inside themes and for each variant (dark, light) just create
 * style dictionary configuration and run the build
 */
for (const theme of themes) {
  for (const themeVariant of THEME_VARIANTS) {
    // @ts-expect-error extend wrong type of configuration collides with ours
    const SDWithConfig = StyleDictionary.extend(getConfig(theme, themeVariant));

    /**
   * Register custom transformers to process token values for
   * the web platform
   */
    SDWithConfig.registerTransform(OkLCH);

    /**
   * Add the custom transformers to a new transformGroup `custom-web`
   * used inside tokens.config.json
   */
    SDWithConfig.registerTransformGroup({
      name: 'custom-web',
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'size/rem',
        'color/oklch',
      ],
    });

    /**
   * Manually run StyleDictionary for all the configured platforms
   */
    console.clear();
    SDWithConfig.buildAllPlatforms();
  }
}

