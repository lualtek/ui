import type { Transform } from 'style-dictionary/types';

const cubicBezier: Transform = {
  name: 'easing/cubic-bezier',
  type: 'value',
  filter: prop => prop.attributes?.category === 'easing',
  transform: token => `cubic-bezier(${token.value.join(', ')})`,
};

export default cubicBezier;
