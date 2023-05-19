/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

import CssBezier from './transformers/css-bezier';
// import HexHslValues from './transformers/hex-hslvalues';
import HexOklchValues from './transformers/hex-oklchvalues';
import SizePxToRem from './transformers/px-rem';
import SizePxToRootEm from './transformers/px-rootem';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const StyleDictionary = require('style-dictionary').extend('src/tokens.config.json');

/**
 * Register custom transformers to process token values for
 * the web platform
 */
// StyleDictionary.registerTransform(HexHslValues);
StyleDictionary.registerTransform(HexOklchValues);
StyleDictionary.registerTransform(SizePxToRem);
StyleDictionary.registerTransform(SizePxToRootEm);
StyleDictionary.registerTransform(CssBezier);

/**
 * Add the custom transformers to a new transformGroup `custom-web`
 * used inside tokens.config.json
 */
StyleDictionary.registerTransformGroup({
  name: 'custom-web',
  transforms: [
    'attribute/cti',
    'name/cti/kebab',
    'time/seconds',
    'content/icon',
    'size/px-rootem',
    'size/px-rem',
    'color/oklchvalue',
    'easing/cubic-bezier',
  ],
});

/**
 * Manually run StyleDictionary for all the configured platforms
 */
console.clear();
StyleDictionary.buildAllPlatforms();
