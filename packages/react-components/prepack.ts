import fs from 'node:fs';

// Read the package.json file
const data = fs.readFileSync('package.json', 'utf-8');

// Parse the file to a JavaScript object
const packageObj = JSON.parse(data) as { type?: string };

// Remove the type property
delete packageObj.type;

// Convert the modified object back to a JSON string
const newPackageJson = JSON.stringify(packageObj, null, 2);

// Write the modified JSON string back to the package.json file
fs.writeFileSync('package.json', newPackageJson);
