import dt from 'directory-tree';
import fs from 'fs-extra';
import { createSpinner } from 'nanospinner';
import path from 'path';
import colors from 'picocolors';
// @ts-expect-error: missing types
import svgstore from 'svgstore';

const generateTypes = (jsonStructure: { iconNames: string[]; iconStyles: string[] }) => `
export type IconNames = '${jsonStructure.iconNames.join('\' |\n\'')}';
export type IconStyles = '${jsonStructure.iconStyles.join('\' |\n\'')}';
`;

const run = () => {
  const spinner = createSpinner('Processing icons...').start();
  const directories = dt(path.join('svgs'));
  fs.ensureDirSync('dist');

  const jsonStructure: {
    svgs: Record<string, string[]>;
    iconNames: string[];
    iconStyles: string[];
  } = {
    svgs: {},
    iconNames: [],
    iconStyles: [],
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const sprite = svgstore();

  directories.children?.filter(dir => dir.name !== '.DS_Store').forEach((dir) => {
    jsonStructure.svgs[dir.name] = [];
    jsonStructure.iconStyles.push(dir.name);
    dir.children?.filter(file => file.name !== '.DS_Store').forEach((file) => {
      const formattedName = file.name.replace(/-\d.*/gm, '').replace('.svg', '').replace(/(Name=).*?/gm, '');
      const iconID = `${dir.name}/${formattedName}`;

      sprite.add(iconID, fs.readFileSync(file.path, 'utf8'));
      jsonStructure.svgs[dir.name].push(file.name);
      jsonStructure.iconNames.push(`${formattedName}`);
    });
  });
  fs.writeFileSync(path.join('dist', 'sprite.svg'), sprite.toString());
  fs.writeFileSync(path.join('dist', 'sprite.d.ts'), `
declare module "@lualtek/icons/sprite" {
  const svgUrl: string
  const svgComponent: React.StatelessComponent<React.SVGAttributes<SVGElement>>
  export default svgUrl
  export { svgComponent as ReactComponent }
}
`);
  fs.writeFileSync(path.join('dist', 'structure.json'), JSON.stringify([...new Set(jsonStructure.iconNames)], null, 2));
  fs.writeFileSync(path.join('dist', 'index.ts'), generateTypes(jsonStructure));
  console.clear();
  spinner.success({ text: colors.green('Icons and types generated'), mark: colors.green('✔') });
};

try {
  run();
  process.exit(0);
} catch (error: unknown) {
  console.error(colors.yellow('⚠️ Something went wrong:'), error);
  process.exit(1);
}
