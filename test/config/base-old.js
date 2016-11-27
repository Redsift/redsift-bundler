import transpiler from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import eslint from 'rollup-plugin-eslint';
import filesize from 'rollup-plugin-filesize';

export default {
  format: 'es',
  globals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM'
  },
  exports: 'named',
  plugins: [
    json(),
    resolve({
      module: true,
      jsnext: true,
      browser: true,
      main: true,
      // skip: [ 'react', 'react-dom' ],
      extensions: [ '.js', '.jsx', '.json']
    }),
    cjs({
      // exclude: 'node_modules/process-es6/**',
      // include: [
      //   'node_modules/fbjs/**',
      //   'node_modules/object-assign/**',
      //   'node_modules/react/**',
      //   'node_modules/react-dom/**'
      // ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      "import React from 'react'": "import * as React from 'react'"
    }),
    // eslint({
    //   configFile: '.eslintrc',
    //   exclude: 'node_modules/**',
    // }),
    transpiler({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ 'stage-0', 'es2015-rollup', 'react'],
      // presets: [ 'stage-0', [ 'es2015', { modules: false } ], 'react'],
      plugins: [ 'transform-class-properties', 'transform-decorators-legacy' ]
    }),
    filesize()
  ],
  sourceMap: true
}
