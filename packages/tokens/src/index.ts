/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import StyleDictionary from 'style-dictionary';
import type { Config } from 'style-dictionary/types';

import HexToOkLch from './transformers/hex-oklch.ts';
import SizePxToRem from './transformers/px-rem.ts';
import SizePxToRootEm from './transformers/px-rootem.ts';

const config: Config = {
  source: ['src/configs/**/*.json'],
  platforms: {
    web: {
      basePxFontSize: 18,
      buildPath: 'platforms/web/',
      transformGroup: 'css',
      transforms: [
        /**
         * Custom transformer
         * @see ./transformers/px-rem.ts
         */
        'size/pxToRem',
        /**
         * Built-in transformer
         * @see https://amzn.github.io/style-dictionary/#/transforms?id=sizepx
         */
        'size/px',
        /**
         * Custom transformer
         * @see ./transformers/px-rootem.ts
         */
        'size/px-rootem',
        /**
         * Custom transformer
         * @see ./transformers/hex-oklch.ts
         */
        'color/hex-to-oklch',
      ],
      files: [
        {
          format: 'css/variables',
          destination: 'tokens.css',
        },
        {
          format: 'json/nested',
          destination: 'tokens.json',
        },
        {
          format: 'json/flat',
          destination: 'tokens-flat.json',
        },
      ],
      options: {
        showFileHeader: true,
        fileHeader: (defaultMessage: string[] = []) => [
          ...defaultMessage,
          '© Lualtek Srl. All rights reserved.',
        ],
      },
    },
    raw: {
      basePxFontSize: 18,
      buildPath: 'platforms/raw/',
      files: [
        {
          format: 'json/nested',
          destination: 'tokens.json',
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
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const SDWithConfig = new StyleDictionary(config);

/**
 * Register custom transformers to process token values for
 * the web platform
 */
SDWithConfig.registerTransform(SizePxToRem);
SDWithConfig.registerTransform(SizePxToRootEm);
SDWithConfig.registerTransform(HexToOkLch);

/**
 * Manually run StyleDictionary for all the configured platforms
 */
console.clear();
await SDWithConfig.hasInitialized;
await SDWithConfig.buildAllPlatforms();
