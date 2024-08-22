/* eslint-disable import/extensions */
/* eslint-disable no-console */
import StyleDictionary from 'style-dictionary';
import type { Config } from 'style-dictionary/types';

import OklchValues from './transformers/oklch-values.ts';
import SizePercentage from './transformers/percentage.ts';
import SizePxToRem from './transformers/px-rem.ts';
import SizePxToRootEm from './transformers/px-rootem.ts';

const config: Config = {
  source: ['src/configs/**/*.json'],
  platforms: {
    web: {
      basePxFontSize: 18,
      buildPath: 'platforms/web/',
      transformGroup: 'custom-web',
      files: [
        {
          format: 'css/variables',
          destination: 'tokens.css',
        },
        {
          format: 'json/nested',
          destination: 'tokens.json',
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
    raw: {
      basePxFontSize: 18,
      buildPath: 'platforms/raw/',
      transformGroup: '',
      files: [
        {
          format: 'json/nested',
          destination: 'tokens.json',
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
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const SDWithConfig = new StyleDictionary(config);

/**
 * Register custom transformers to process token values for
 * the web platform
 */
// StyleDictionary.registerTransform(HexHslValues);
SDWithConfig.registerTransform(OklchValues);
SDWithConfig.registerTransform(SizePxToRem);
SDWithConfig.registerTransform(SizePercentage);
SDWithConfig.registerTransform(SizePxToRootEm);

/**
 * Add the custom transformers to a new transformGroup `custom-web`
 * used inside tokens.config.json
 */
await SDWithConfig.registerTransformGroup({
  name: 'custom-web',
  transforms: [
    'attribute/cti',
    'name/kebab',
    'time/seconds',
    'html/icon',
    'size/px-rootem',
    'size/px-rem',
    'size/px',
    'size/percent',
    'color/oklchvalues',
    'cubicBezier/css',
  ],
});

/**
 * Manually run StyleDictionary for all the configured platforms
 */
console.clear();
await SDWithConfig.hasInitialized;
await SDWithConfig.buildAllPlatforms();
