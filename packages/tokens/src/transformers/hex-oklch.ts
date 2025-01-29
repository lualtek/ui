import Color, { type ColorTypes } from 'colorjs.io';
import type { Transform } from 'style-dictionary/types';

const okLCHValues: Transform = {
  name: 'color/hex-to-oklch',
  type: 'value',
  filter: (token) => token.$type === 'color',
  transform: (token) => {
    if (!token.value && !token.$value) {
      throw new Error(`Color token "${token.name}" has an empty value.`);
    }

    const color = new Color(token.$value as ColorTypes).to('oklch');
    return color.toString().replace('none', '0');
  },
};

export default okLCHValues;
