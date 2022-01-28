/* eslint-disable import/no-extraneous-dependencies */
import { create } from '@storybook/theming';

export default create({
  base: 'light',
  brandTitle: 'Lualtek Design System',
  brandUrl: 'https://lualtek.io',
  colorPrimary: '#EE0000',
  colorSecondary: '#454A55',

  // UI
  appBg: '#F9F9FB',
  appBorderColor: '#E3E6EC',

  // Typography
  fontBase: '"Open Sans", sans-serif',

  // Toolbar default and active colors
  barTextColor: '#454A55',
  barSelectedColor: '#000',
});
