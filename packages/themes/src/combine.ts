/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs-extra';
import path from 'path';

const formatTheme = (path: string) => {
  const theme = fs.readFileSync(path, 'utf8');
  return theme.replace(':root {', '').replace('}', '');
};

const run = (folder: string) => {
  const lightTheme = formatTheme(path.join('platforms', 'web', folder, 'light.css'));
  const darkTheme = formatTheme(path.join('platforms', 'web', folder, 'dark.css'));

  const template = `
  :root,
  [data-theme='light'] {
    ${lightTheme}
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme='light']) {
      ${darkTheme}
    }
  }

  [data-theme='dark'],
  :root[data-theme='dark'] {
    ${darkTheme}
  }
  `;

  fs.writeFileSync(path.join('platforms', 'web', folder, 'themes.css'), template);
};

try {
  const themes = fs.readdirSync(path.join('platforms', 'web')).filter(
    file => fs.statSync(path.join('platforms', 'web', file)).isDirectory(),
  );
  themes.forEach(run);
  process.exit(0);
} catch (error: unknown) {
  console.log('————————————————————————————————————————————————————————————————————————————————————— \n');
  console.error('⚠️  Something went wrong:', error);
  console.log('\n————————————————————————————————————————————————————————————————————————————————————— \n\n');
  process.exit(1);
}
