// eslint-disable-next-line import/no-extraneous-dependencies
import * as StyleDictionary from 'style-dictionary';
import Color from 'tinycolor2';

const hslValue: StyleDictionary.Named<StyleDictionary.Transform> = {
  name: 'color/hslvalue',
  type: 'value',
  matcher: prop => prop.attributes?.category === 'color',
  transformer: (token) => {
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
