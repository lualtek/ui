/* eslint-disable no-console */
import StyleDictionary from 'style-dictionary';

import CssBezier from './transformers/css-bezier';
// import HexHslValues from './transformers/hex-hslvalues';
import HexOklchValues from './transformers/hex-oklchvalues';
import SizePxToRem from './transformers/px-rem';
import SizePxToRootEm from './transformers/px-rootem';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const SDWithConfig = StyleDictionary.extend('src/tokens.config.json');

/**
 * Register custom transformers to process token values for
 * the web platform
 */
// StyleDictionary.registerTransform(HexHslValues);
SDWithConfig.registerTransform(HexOklchValues);
SDWithConfig.registerTransform(SizePxToRem);
SDWithConfig.registerTransform(SizePxToRootEm);
SDWithConfig.registerTransform(CssBezier);

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
    'size/px-rootem',
    'size/px-rem',
    'size/px',
    'color/oklchvalue',
    'easing/cubic-bezier',
  ],
});

/**
 * Manually run StyleDictionary for all the configured platforms
 */
console.clear();
SDWithConfig.buildAllPlatforms();
