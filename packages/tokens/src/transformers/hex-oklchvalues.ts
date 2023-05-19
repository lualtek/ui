import Color from 'colorjs.io';
import type StyleDictionary from 'style-dictionary';

export default {
  name: 'color/oklchvalue',
  type: 'value',
  matcher: (prop: StyleDictionary.DesignTokens) => prop.attributes.category === 'color',
  transformer: (token: StyleDictionary.DesignToken) => {
    const color = new Color(token.value).to('oklch');
    const colorValues = `${(color.oklch[0] * 100).toFixed(2)}% ${color.oklch[1].toFixed(2)} ${Number.isNaN(color.oklch[2]) ? 0 : color.oklch[2].toFixed(1) || 0}`;

    if (color.alpha === 1) {
      return `${colorValues}`;
    }

    return `${colorValues} / ${color.alpha}`;
  },
};
