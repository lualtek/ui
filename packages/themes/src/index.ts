/* eslint-disable no-console */
import StyleDictionary from 'style-dictionary';

import OkLCH from './transformers/oklch';

const SDWithConfig = StyleDictionary.extend('src/themes.config');

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

