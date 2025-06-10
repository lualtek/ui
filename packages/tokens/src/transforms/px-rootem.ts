import type { Transform } from 'style-dictionary/types';

const pxRootEm: Transform = {
  name: 'size/px-rootem',
  type: 'value',
  filter: prop => prop.$type === 'mediaquery',
  transform: token => `${(token.$value / 16).toFixed(0)}em`,
};

export default pxRootEm;
