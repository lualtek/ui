import type { Transform } from 'style-dictionary/types';

const pxToRem: Transform = {
  name: 'size/px-rem',
  type: 'value',
  filter: prop => prop.attributes?.category === 'size/rem',
  transform: (token, options) => {
    const baseRootSize = options?.basePxFontSize as number ?? 16;
    return `${(token.value / baseRootSize).toFixed(2)}rem`;
  },
};

export default pxToRem;
