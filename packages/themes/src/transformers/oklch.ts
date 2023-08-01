import Color from 'colorjs.io';
import * as StyleDictionary from 'style-dictionary';

const OkLCH: StyleDictionary.Named<StyleDictionary.Transform> = {
  name: 'color/oklch',
  type: 'value',
  transitive: true,
  matcher: token => token.attributes?.category === 'color',
  transformer: (token) => {
    // This is used only if parsing original token values (hex colors)
    const color = new Color(token.value).to('oklch');
    // const color = new Color(`oklch(${token.value})`).to('oklch');
    const colorValues = `${(color.oklch[0] * 100).toFixed(2)}% ${color.oklch[1].toFixed(2)} ${Number.isNaN(color.oklch[2]) ? 0 : color.oklch[2].toFixed(1) || 0}`;

    if (token.transparency) {
      return `oklch(${colorValues} / ${token.transparency})`;
    }

    return `oklch(${colorValues}${color.alpha !== 1 ? ` / ${color.alpha}` : ''})`;
  },
};

export default OkLCH;
