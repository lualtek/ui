/* eslint-disable no-restricted-syntax */
import { readFile, writeFile } from 'fs/promises';
import * as path from 'path';

const API_JSON_PATH = 'dist/api-temp.json';
const OUTPUT_FOLDER = 'dist/components';

type TypeAlias = {
  name: string;
  source: {
    url: string;
    path: string;
  };
  type: {
    properties?: Array<{
      name: string;
    }>;
    types?: Array<{
      properties: Array<{
        name: string;
      }>;
    }>;
  };
}
type InputJson = {
  typeAliases: TypeAlias[];
};

function pascalToKebabCase(str: string): string {
  return str
    .split(/(?=[A-Z])/) // Split the string based on uppercase letters
    .map(word => word.toLowerCase()) // Convert each word to lowercase
    .join('-') // Join the words with a hyphen
    .replace('-props', ''); // Remove the trailing word 'props'
}

async function mapToTypeAliases(): Promise<TypeAlias[]> {
  try {
    const jsonData = await readFile(API_JSON_PATH, 'utf8');
    const parsedData = JSON.parse(jsonData) as InputJson;

    if (!Array.isArray(parsedData.typeAliases)) {
      return [];
    }

    // Qui si possono modificare cose
    // return parsedData.typeAliases.map(alias => ({
    //   name: alias.name,
    //   source: alias.source,
    //   properties:
    //     alias.type.properties
    //     ?? (alias.type.types?.find(type => type.properties)?.properties ?? []),
    // }));
    return parsedData.typeAliases.filter(alias => alias.name.endsWith('Props'));
  } catch (err) {
    console.error('Error reading or parsing api.json:', err);
    throw err;
  }
}

async function saveTypeAliasesToJsonFiles() {
  const typeAliases = await mapToTypeAliases();

  for (const alias of typeAliases) {
    const jsonFileName = `${pascalToKebabCase(alias.name)}.doc.json`;
    // "path": "packages/react-components/src/components/aspect-ratio",
    const folderComponentName = alias.source.path.replace('packages/react-components/src/components/', '');
    const jsonFilePath = path.join(OUTPUT_FOLDER, folderComponentName, jsonFileName);

    try {
      await writeFile(jsonFilePath, JSON.stringify(alias, null, 2), 'utf8');
      console.log(`Doc for ${alias.name.replace('Props', '')} →`, `${jsonFileName}`, '\x1b[32m✔\x1b[0m');
    } catch (err) {
      console.error(`Error saving ${jsonFileName}:`, err);
    }
  }
}

(async () => {
  await saveTypeAliasesToJsonFiles();
})();
