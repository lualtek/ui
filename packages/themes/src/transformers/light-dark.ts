import type { Transform } from 'style-dictionary/types';

type ValueType = string | { light: string; dark: string };

const CssLightDark: Transform = {
  name: 'css/light-dark',
  type: 'value',
  transitive: true,
  transform: (token) => {
    if (!token.value && !token.$value) {
      throw new Error(`Color token "${token.name}" has an empty value.`);
    }

    const tokenValue = (token.value as ValueType) || (token.$value as ValueType);
    // check if tokenValue is an object with light and dark keys
    if (typeof tokenValue === 'object' && tokenValue.light && tokenValue.dark) {
      return `light-dark(${tokenValue.light}, ${tokenValue.dark})`;
    }

    return tokenValue;
  },
};

export default CssLightDark;
