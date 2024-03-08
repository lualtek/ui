import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import dts from 'rollup-plugin-dts';
import css from 'rollup-plugin-import-css';
import svg from 'rollup-plugin-svg';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json' assert { type: 'json' };

const config = {
  input: 'dist/index.js',
};

export const replaceSettings = (env) => {
  const replaceConfig = env
    ? {
      'process.env.NODE_ENV': JSON.stringify(env),
      preventAssignment: false,
    }
    : {
      preventAssignment: false,
    };

  // @ts-expect-error - TS doesn't know about this property
  replaceConfig.__VERSION__ = `${pkg.version}`;

  return replace(replaceConfig);
};

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  // ...Object.keys(pkg.optionalDependencies || {}),
];

const pureClass = {
  transform(code) {
    // Replace TS emitted @class function annotations with PURE so terser
    // can remove them
    return code.replace(/\/\*\* @class \*\//g, '/*@__PURE__*/');
  },
};

const umd = Object.assign({}, config, {
  output: {
    file: `dist/${pkg.name}.dev.js`,
    format: 'umd',
    name: 'LualtekReactComponents',
    exports: 'named',
    globals: { react: 'React' },
  },
  external: ['react', 'react-dom'],
  plugins: [resolve(), css(), json(), svg(), replaceSettings('development')],
});

const umdProd = Object.assign({}, umd, {
  output: Object.assign({}, umd.output, {
    file: `dist/${pkg.name}.js`,
  }),
  plugins: [
    resolve(),
    css(),
    json(),
    svg(),
    replaceSettings('production'),
    pureClass,
    terser({ output: { comments: false } }),
  ],
});

const cjs = Object.assign({}, config, {
  input: ['dist/index.js'],
  output: {
    entryFileNames: '[name].js',
    dir: 'dist/cjs',
    format: 'cjs',
    exports: 'named',
  },
  plugins: [resolve(), css(), json(), svg(), commonjs({ }), replaceSettings()],
  external,
});

export const es = Object.assign({}, config, {
  input: ['dist/index.js'],
  output: {
    entryFileNames: '[name].mjs',
    format: 'es',
    exports: 'named',
    preserveModules: true,
    dir: 'dist/es',
  },
  plugins: [resolve(), css(), json(), svg(), replaceSettings()],
  external,
});

const types = {
  input: 'types/index.d.ts',
  output: {
    format: 'es',
    file: 'dist/index.d.ts',
  },
  plugins: [dts()],
};

// eslint-disable-next-line import/no-default-export
const result = [
  umd,
  umdProd,
  cjs,
  es,
  types,
];

export default result;
