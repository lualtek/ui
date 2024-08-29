import Color from 'colorjs.io';
import type { Transform } from 'style-dictionary/types';

const okLCHValues: Transform = {
  name: 'color/hex-to-oklch',
  type: 'value',
  filter: token => token.$type === 'color',
  transform: (token) => {
    const color = new Color(token.$value).to('oklch');
    return color.toString().replace('none', '0');
  },
};

export default okLCHValues;
