import Color from 'colorjs.io';
import type { Transform } from 'style-dictionary/types';

const colorValues = (color: Color, transparency: string) => {
  const l = color.get('l').toFixed(2);
  const c = color.get('c').toFixed(2);
  const h = Number.isNaN(color.get('h')) ? 0 : color.get('h').toFixed(2);

  return transparency ? `oklch(${l} ${c} ${h} / ${transparency})` : `oklch(${l} ${c} ${h}${color.alpha !== 1 ? ` / ${color.alpha}` : ''})`;
};

const OkLCH: Transform = {
  name: 'color/oklch',
  type: 'value',
  transitive: true,
  filter: token => token.attributes?.category === 'color',
  transform: (token) => {
    // This is used only if parsing original token values (hex colors)
    const color = new Color(token.value).to('oklch');

    if (token.saturation >= 0) {
      color.set('c', token.saturation);
    }

    return colorValues(color, token.transparency);
  },
};

export default OkLCH;
