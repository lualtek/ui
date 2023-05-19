// import Color from 'colorjs.io';
import type StyleDictionary from 'style-dictionary';

export default {
  name: 'color/oklch',
  type: 'value',
  matcher: (prop: StyleDictionary.DesignTokens) => prop.attributes.category === 'color',
  transformer: (token: StyleDictionary.DesignToken) => {
    const colorValues = `oklch(${token.value})`;

    return colorValues;
  },
};
