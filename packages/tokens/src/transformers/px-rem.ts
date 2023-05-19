import * as StyleDictionary from 'style-dictionary';

const pxToRem: StyleDictionary.Named<StyleDictionary.Transform> = {
  name: 'size/px-rem',
  type: 'value',
  matcher: prop => prop.attributes?.category === 'size',
  transformer: (token, options) => {
    const baseRootSize = options?.basePxFontSize ?? 16;
    return `${(token.value / baseRootSize).toFixed(2)}rem`;
  },
};

export default pxToRem;
