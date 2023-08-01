/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment */
module.exports = {
  source: ['src/configs/**/*.json'],
  platforms: {
    web: {
      basePxFontSize: 18,
      buildPath: 'platforms/web/',
      transformGroup: 'custom-web',
      files: [
        {
          format: 'css/variables',
          destination: 'tokens.css',
        },
        {
          format: 'json/nested',
          destination: 'tokens.json',
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
    raw: {
      basePxFontSize: 18,
      buildPath: 'platforms/raw/',
      transformGroup: '',
      files: [
        {
          format: 'json/nested',
          destination: 'tokens.json',
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
