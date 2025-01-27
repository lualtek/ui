import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const API_JSON_PATH = 'dist/api-temp.json';
const OUTPUT_FOLDER = 'dist/components';

type SinglePropType = {
  name: string;
  description?: string;
  defaultValue?: string;
  kind: string;
  readOnly?: boolean;
  optional?: boolean;
  type: {
    kind: string;
    objectType: {
      kind: string;
      name: string;
      packageName: string;
    };
    indexType: {
      kind: string;
      value: string;
    };
    types?: Array<{
      kind: string;
      value: string;
    }>;
  };
};

type TypeAlias = {
  name: string;
  source: {
    url: string;
    path: string;
  };
  type: {
    properties?: Array<SinglePropType>;
    types?: Array<{
      properties: Array<SinglePropType>;
    }>;
    typeArguments?: Array<{
      [key: string]: unknown;
      kind: string;
      types?: SinglePropType['type']['types'];
    }>;
  };
};

type InputJson = {
  typeAliases: Array<TypeAlias>;
};

function pascalToKebabCase(str: string): string {
  return str
    .split(/(?=[A-Z])/) // Split the string based on uppercase letters
    .map((word) => word.toLowerCase()) // Convert each word to lowercase
    .join('-') // Join the words with a hyphen
    .replace('-props', ''); // Remove the trailing word 'props'
}

async function mapToTypeAliases(): Promise<Array<TypeAlias>> {
  try {
    const jsonData = await readFile(API_JSON_PATH, 'utf8');
    const parsedData = JSON.parse(jsonData) as InputJson;
    const filteredAliases = parsedData.typeAliases.filter((alias) => alias.name.endsWith('Props'));

    if (!Array.isArray(parsedData.typeAliases)) {
      return [];
    }

    // Qui si possono modificare cose
    return filteredAliases.map((alias) => {
      // Get the whole type and props referenced by the component
      const referencedProps = filteredAliases.filter(
        (props) => props.name === alias.type.typeArguments?.[0]?.name,
      )?.[0];
      // Extract the types from the typeArguments like Pick, Omit, etc.
      const toFilterTypes = alias.type.typeArguments?.find((type) => type.types)?.types?.map((type) => type.value);
      // Filter the properties of the referenced type by the types extracted above
      const filteredProviders = referencedProps?.type.properties?.filter((prop) => toFilterTypes?.includes(prop.name));

      return {
        name: alias.name,
        source: alias.source,
        type: alias.type,
        properties:
          alias.type.properties ??
          alias.type.types?.find((type) => type.properties)?.properties ??
          filteredProviders ??
          [],
      };
    });

    // return parsedData.typeAliases.filter(alias => alias.name.endsWith('Props'));
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
