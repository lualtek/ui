/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import OkLch from './transformers/oklch';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const StyleDictionary = require('style-dictionary').extend('src/themes.config.js');

/**
 * Register custom transformers to process token values for
 * the web platform
 */
StyleDictionary.registerTransform(OkLch);

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
    'size/rem',
    'color/oklch',
  ],
});

/**
 * Manually run StyleDictionary for all the configured platforms
 */
console.clear();
StyleDictionary.buildAllPlatforms();

