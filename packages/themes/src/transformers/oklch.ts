import Color from 'colorjs.io';
import type { Transform } from 'style-dictionary/types';

const OkLCH: Transform = {
  name: 'color/oklch',
  type: 'value',
  transitive: true,
  filter: token => token.$type === 'color',
  transform: (token) => {
    if (!token.value && !token.$value) {
      throw new Error(`Color token "${token.name}" has an empty value.`);
    }

    const color = new Color(token.value).to('oklch');
    const normalizedColor = color.toString().replace('none', '0');

    if (token.saturation >= 0) {
      color.set('c', token.saturation);
    }

    return token.transparency ? `oklch(from ${normalizedColor} l c h / ${token.transparency})` : normalizedColor;
  },
};

export default OkLCH;
