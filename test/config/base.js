import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import globals from 'rollup-plugin-node-globals';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import eslint from 'rollup-plugin-eslint';
import filesize from 'rollup-plugin-filesize';

export default {
  format: 'umd',
  plugins: [
    json(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ [ 'es2015', { modules: false } ], 'stage-0', 'react' ],
      plugins: [ 'external-helpers', 'transform-decorators-legacy' ]
    }),
    cjs({
      exclude: 'node_modules/process-es6/**',
      include: [
        'node_modules/fbjs/**',
        'node_modules/object-assign/**',
        'node_modules/react/**',
        'node_modules/react-dom/**'
      ]
    }),
    eslint({ // NOTE: include this AFTER cjs(). Results in 'React does not export default' error otherwise!
      configFile: '.eslintrc',
      exclude: 'node_modules/**',
    }),
    globals(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    resolve({
      browser: true,
      main: true
    }),
    filesize()
  ],
  sourceMap: true
}
