import * as fs from 'fs';
import * as path from 'path';

const rootFolderPath: string = path.join(__dirname, 'configs');

function generateIndexForFolder(folderPath: string): void {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Error reading "${folderPath}" directory:`, err);
      return;
    }

    const importStatements: string[] = [];
    const exportStatements: Record<string, any[]> = {};

    files.forEach((file) => {
      if (path.extname(file) === '.json') {
        const colorName: string = path.basename(file, '.json').replace(/-/g, '');
        const importStatement = `const ${colorName} = require('./${colorName}.json');`;
        importStatements.push(importStatement);

        // eslint-disable-next-line
        const colorData = require(path.join(folderPath, file)) as Record<string, any>;
        Object.keys(colorData).forEach((key) => {
          if (!exportStatements[key]) {
            exportStatements[key] = [];
          }

          exportStatements[key].push(`...${colorName}["${key}"]`);
        });
      }
    });

    const indexContent = `
${importStatements.join('\n')}

module.exports = {
${Object.keys(exportStatements)
    .map(key => `  ${key}: {\n    ${exportStatements[key].join(',\n    ')}\n  },`)
    .join('\n')}
};
`;

    const indexPath: string = path.join(folderPath, 'index.js');
    fs.writeFile(indexPath, indexContent, (err) => {
      if (err) {
        console.error(`Error creating "${indexPath}" file:`, err);
        return;
      }

      console.log(`"${indexPath}" has been successfully generated.`);
    });
  });
}

fs.readdir(rootFolderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Error reading project directory:', err);
    return;
  }

  files.forEach((entry) => {
    if (entry.isDirectory()) {
      const folderPath: string = path.join(rootFolderPath, entry.name);
      generateIndexForFolder(folderPath);
    }
  });
});
