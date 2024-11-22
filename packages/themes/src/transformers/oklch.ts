import Color, { ColorTypes } from 'colorjs.io';
import type { Transform } from 'style-dictionary/types';

type ThemeToken = {
  name: string;
  value: ColorTypes;
  $value: ColorTypes;
  $type: string;
  saturation: number;
  tranparency: { light: string; dark: string };
}

const OkLCH: Transform = {
  name: 'color/oklch',
  type: 'value',
  transitive: true,
  filter: token => token.$type === 'color',
  transform: (token) => {
    if (!token.value && !token.$value) {
      throw new Error(`Color token "${token.name}" has an empty value.`);
    }

    const { light, dark } = token.value as { light: string; dark: string };

    const lightColor = new Color(light).to('oklch');
    const darkColor = new Color(dark).to('oklch');
    const transparency = token.original.transparency as { light: string; dark: string } | undefined;
    const normalizedColor = (color: Color) => color.toString().replace('none', '0');
    const colorSaturation = (color: Color) => color.set('c', Number(token.saturation));

    if (token.saturation >= 0) {
      colorSaturation(lightColor);
      colorSaturation(darkColor);
    }

    const okLCHFormatter = (color: Color, transparency?: string) => (transparency
      ? `oklch(from ${normalizedColor(color)} l c h / ${transparency})`
      : normalizedColor(color)
    );

    return `light-dark(${okLCHFormatter(lightColor, transparency?.light)}, ${okLCHFormatter(darkColor, transparency?.dark)})`;
  },
};

export default OkLCH;
