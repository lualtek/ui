import * as StyleDictionary from 'style-dictionary';

const OkLCH: StyleDictionary.Named<StyleDictionary.Transform> = {
  name: 'color/oklch',
  type: 'value',
  matcher: prop => prop.attributes?.category === 'color',
  transformer: (token) => {
    const colorValues = `oklch(${token.value})`;

    return colorValues;
  },
};

export default OkLCH;
