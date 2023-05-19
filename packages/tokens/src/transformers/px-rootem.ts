import * as StyleDictionary from 'style-dictionary';

const pxRootEm: StyleDictionary.Named<StyleDictionary.Transform> = {
  name: 'size/px-rootem',
  type: 'value',
  matcher: prop => prop.attributes?.category === 'media',
  transformer: token => `${(token.value / 16).toFixed(0)}em`,
};

export default pxRootEm;
