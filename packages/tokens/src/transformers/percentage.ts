import type { Transform } from 'style-dictionary/types';

const percentage: Transform = {
  name: 'size/percent',
  type: 'value',
  filter: prop => prop.attributes?.category === 'size/percent',
  transform: token => `${token.value}%`,
};

export default percentage;
