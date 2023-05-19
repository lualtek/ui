import * as StyleDictionary from 'style-dictionary';

const cubicBezier: StyleDictionary.Named<StyleDictionary.Transform> = {
  name: 'easing/cubic-bezier',
  type: 'value',
  matcher: prop => prop.attributes?.category === 'easing',
  transformer: token => `cubic-bezier(${token.value.join(', ')})`,
};

export default cubicBezier;
