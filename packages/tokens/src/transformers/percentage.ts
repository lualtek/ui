import * as StyleDictionary from 'style-dictionary';

const percentage: StyleDictionary.Named<StyleDictionary.Transform> = {
  name: 'size/percent',
  type: 'value',
  matcher: prop => prop.attributes?.category === 'size/percent',
  transformer: token => `${token.value}%`,
};

export default percentage;
