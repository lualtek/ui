/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

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
