const path = require('path');

const config = {
  es6: {
    inputFile: path.join('test', 'es6', 'input.js'),
    rollupCLI: {
      config: {
        prod: path.join('test', 'es6', 'rollup.config.prod.js'),
        dev: path.join('test', 'es6', 'rollup.config.dev.js'),
      },
      created: {
        outputFile: path.join('test', 'tmp', 'es6', 'output', 'rollup-cli', 'js', 'es6.umd.min.js'),
        outputFileDev: path.join('test', 'tmp', 'es6', 'output', 'rollup-cli', 'js', 'es6.umd.js')
      },
      reference: {
        outputFile: path.join('test', 'es6', 'ref-output', 'rollup-cli', 'js', 'es6.umd.min.js'),
        outputFileDev: path.join('test', 'es6', 'ref-output', 'rollup-cli', 'js', 'es6.umd.js')
      }
    },
    webpackGulp: {
      created: {
        outputFolder: path.join('..', 'tmp', 'es6', 'output', 'webpack-gulp'),
        outputFile: path.join('test', 'tmp', 'es6', 'output', 'webpack-gulp', 'js', 'es6.umd.min.js'),
        outputFileDev: path.join('test', 'tmp', 'es6', 'output', 'webpack-gulp', 'js', 'es6.umd.js')
      },
      reference: {
        outputFile: path.join('test', 'es6', 'ref-output', 'webpack-gulp', 'js', 'es6.umd.min.js'),
        outputFileDev: path.join('test', 'es6', 'ref-output', 'webpack-gulp', 'js', 'es6.umd.js')
      }
    }
  },
  reactJSX: {
    inputFile: path.join('test', 'react-jsx', 'input.js'),
    rollupCLI: {
      config: {
        prod: path.join('test', 'react-jsx', 'rollup.config.prod.js'),
        dev: path.join('test', 'react-jsx', 'rollup.config.dev.js'),
      },
      created: {
        outputFile: path.join('test', 'tmp', 'react-jsx', 'output', 'rollup-cli', 'js', 'react-jsx.umd.min.js'),
        outputFileDev: path.join('test', 'tmp', 'react-jsx', 'output', 'rollup-cli', 'js', 'react-jsx.umd.js')
      },
      reference: {
        outputFile: path.join('test', 'react-jsx', 'ref-output', 'rollup-cli', 'js', 'react-jsx.umd.min.js'),
        outputFileDev: path.join('test', 'react-jsx', 'ref-output', 'rollup-cli', 'js', 'react-jsx.umd.js')
      }
    },
    webpackGulp: {
      created: {
        outputFolder: path.join('..', 'tmp', 'react-jsx', 'output', 'webpack-gulp'),
        outputFile: path.join('test', 'tmp', 'react-jsx', 'output', 'webpack-gulp', 'js', 'react-jsx.umd.min.js'),
        outputFileDev: path.join('test', 'tmp', 'react-jsx', 'output', 'webpack-gulp', 'js', 'react-jsx.umd.js')
      },
      reference: {
        outputFile: path.join('test', 'react-jsx', 'ref-output', 'webpack-gulp', 'js', 'react-jsx.umd.min.js'),
        outputFileDev: path.join('test', 'react-jsx', 'ref-output', 'webpack-gulp', 'js', 'react-jsx.umd.js')
      }
    }
  },
  tmpFolder: path.join('test/tmp')
}

module.exports = config;
