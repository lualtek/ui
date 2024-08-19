// eslint-disable-next-line import/no-extraneous-dependencies
import type { Transform } from 'style-dictionary/types';
import Color from 'tinycolor2';

const hslValue: Transform = {
  name: 'color/hslvalue',
  type: 'value',
  filter: prop => prop.attributes?.category === 'color',
  transform: (token) => {
    const color = Color(token.value);
    const o = color.toHsl();
    const vals = `${Math.round(o.h)} ${Math.round(o.s * 100)}% ${Math.round(o.l * 100)}%`;

    if (color.getAlpha() === 1) {
      return `${vals}`;
    }

    return `${vals} / ${o.a}`;
  },
};

export default hslValue;
