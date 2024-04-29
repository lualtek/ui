/* eslint-disable @typescript-eslint/no-var-requires */

const { postcss } = require('@lualtek/config');

module.exports = {
  plugins: {
    ...postcss.getConfig().plugins,
  },
};
