import Color from 'colorjs.io';
import * as StyleDictionary from 'style-dictionary';

const OkLCH: StyleDictionary.Named<StyleDictionary.Transform> = {
  name: 'color/oklch',
  type: 'value',
  matcher: prop => prop.attributes?.category === 'color',
  transformer: (token) => {
    console.log(token);
    const color = new Color(token.value).to('oklch');
    const colorValues = `${(color.oklch[0] * 100).toFixed(2)}% ${color.oklch[1].toFixed(2)} ${Number.isNaN(color.oklch[2]) ? 0 : color.oklch[2].toFixed(1) || 0}`;

    if (color.alpha === 1) {
      return `oklch(${colorValues})`;
    }

    return `oklch(${colorValues} / ${color.alpha})`;
  },
};

export default OkLCH;
