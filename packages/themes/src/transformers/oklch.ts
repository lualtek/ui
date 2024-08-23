import Color from 'colorjs.io';
import type { Transform } from 'style-dictionary/types';

const colorValues = (color: Color) => {
  const l = color.get('l').toFixed(2);
  const c = color.get('c').toFixed(2);
  const h = Number.isNaN(color.get('h')) ? 0 : color.get('h').toFixed(2);

  return `oklch(${l} ${c} ${h})`;
};

const OkLCH: Transform = {
  name: 'color/oklch',
  type: 'value',
  transitive: true,
  filter: token => token.$type === 'color',
  transform: (token) => {
    // This is used only if parsing original token values (hex colors)
    const color = new Color(token.value).to('oklch');

    if (token.saturation >= 0) {
      color.set('c', token.saturation);
    }

    return token.transparency ? `oklch(from ${color.toString()} l c h / ${token.transparency})` : colorValues(color);
  },
};

export default OkLCH;
