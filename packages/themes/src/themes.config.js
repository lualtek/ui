/* eslint-disable
  @typescript-eslint/no-unsafe-assignment,
  @typescript-eslint/no-var-requires,
  @typescript-eslint/no-unsafe-return
*/
const { hideBin } = require('yargs/helpers');

const yargs = require('yargs/yargs');
// const ColorTokens = require('../../tokens/src/configs/colors');
const ColorTokens = require('@lualtek/tokens/platforms/raw/tokens.json');

const { argv } = yargs(hideBin(process.argv));
module.exports = {
  source: [`./src/templates/${argv.name}/*.json`],
  tokens: {
    ...ColorTokens,
  },
  platforms: {
    web: {
      basePxFontSize: 18,
      buildPath: 'platforms/web/',
      transformGroup: 'custom-web',
      files: [
        {
          format: 'css/variables',
          destination: `${argv.name}.css`,
        },
        {
          format: 'json/flat',
          destination: `${argv.name}.json`,
        },
      ],
      options: {
        showFileHeader: true,
        fileHeader: defaultMessage => [
          ...defaultMessage,
          '© Lualtek Srl. All rights reserved.',
        ],
      },
    },
  },
};
