import StyleDictionary from 'style-dictionary';
import type { ValueTransform } from 'style-dictionary/types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const pxToRemBuiltin = StyleDictionary.hooks.transforms['size/pxToRem'];

const pxToRem: ValueTransform = {
  ...pxToRemBuiltin as ValueTransform,
  filter: prop => prop.$type === 'dimension-px-to-rem',
  name: 'size/pxToRem',
};

export default pxToRem;
