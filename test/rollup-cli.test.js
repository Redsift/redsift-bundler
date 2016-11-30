// const test = require('@redsift/tape-reel')(null, null, 'rollup-cli');
// const path = require('path');
// const fs = require('fs');
// const execSync = require('child_process').execSync;
// const utils = require('./lib/utils');
//
// const rollupBin = './node_modules/.bin/rollup';
// const config = {
//   es6: {
//     rollupConfigFile: path.join('test', 'es6', 'rollup.config.prod.js'),
//     rollupConfigFileDev: path.join('test', 'es6', 'rollup.config.dev.js'),
//     inputFile: path.join('test', 'es6', 'input.js'),
//     outputFile: path.join('test', 'tmp', 'es6', 'output', 'rollup', 'bundle-output.min.js'),
//     outputFileDev: path.join('test', 'tmp', 'es6', 'output', 'rollup', 'bundle-output.js'),
//     outputRefMinFile: path.join('test', 'es6', 'ref-output', 'rollup', 'bundle-output.min.js'),
//     outputRefFile: path.join('test', 'es6', 'ref-output', 'rollup', 'bundle-output.js')
//   },
//   reactJSX: {
//     rollupConfigFile: path.join('test', 'react-jsx', 'rollup.config.prod.js'),
//     rollupConfigFileDev: path.join('test', 'react-jsx', 'rollup.config.dev.js'),
//     inputFile: path.join('test', 'react-jsx', 'input.js'),
//     outputFile: path.join('test', 'tmp', 'react-jsx', 'output', 'rollup', 'bundle-output.min.js'),
//     outputFileDev: path.join('test', 'tmp', 'react-jsx', 'output', 'rollup', 'bundle-output.js'),
//     outputRefMinFile: path.join('test', 'react-jsx', 'ref-output', 'rollup', 'bundle-output.min.js'),
//     outputRefFile: path.join('test', 'react-jsx', 'ref-output', 'rollup', 'bundle-output.js')
//   },
//   tmpFolder: path.join('test/tmp')
// }
//
// test('setup', function(t) {
//   execSync(`rm -rf ${config.tmpFolder}`);
//   t.end();
// });
//
test('builds a minified UMD bundle from an ES6 input file', function(t) {
  const rollupConfigFileExists = utils.doesFileExist(config.es6.rollupConfigFile);
  t.ok(rollupConfigFileExists, 'config file exists');

  const code = execSync(`${rollupBin} -c ${config.es6.rollupConfigFile}`);

  const outputFileExists = utils.doesFileExist(config.es6.outputFile);
  t.ok(outputFileExists, 'rollup-cli created output file');

  const umdOutput = fs.readFileSync(config.es6.outputFile).toString();
  const umdOutputRefMin = fs.readFileSync(config.es6.outputRefMinFile).toString();

  t.ok(umdOutput.toString() === umdOutputRefMin.toString(), 'output file equals reference');

  t.end();
});
//
// test('builds an un-minified UMD bundle from an ES6 input file', function(t) {
//   const rollupConfigFileExists = utils.doesFileExist(config.es6.rollupConfigFileDev);
//   t.ok(rollupConfigFileExists, 'config file exists');
//
//   const code = execSync(`${rollupBin} -c ${config.es6.rollupConfigFileDev}`);
//
//   const outputFileExists = utils.doesFileExist(config.es6.outputFileDev);
//   t.ok(outputFileExists, 'rollup-cli created output file');
//
//   const umdOutput = fs.readFileSync(config.es6.outputFileDev).toString();
//   const umdOutputRefDev = fs.readFileSync(config.es6.outputRefFile).toString();
//
//   t.ok(umdOutput.toString() === umdOutputRefDev.toString(), 'output file equals reference');
//
//   t.end();
// });
//
// test('builds a minified UMD bundle from a React/JSX input file', function(t) {
//   const rollupConfigFileExists = utils.doesFileExist(config.reactJSX.rollupConfigFile);
//   t.ok(rollupConfigFileExists, 'config file exists');
//
//   const code = execSync(`${rollupBin} -c ${config.reactJSX.rollupConfigFile}`);
//
//   const outputFileExists = utils.doesFileExist(config.reactJSX.outputFile);
//   t.ok(outputFileExists, 'rollup-cli created output file');
//
//   const umdOutput = fs.readFileSync(config.reactJSX.outputFile).toString();
//   const umdOutputRef = fs.readFileSync(config.reactJSX.outputRefMinFile).toString();
//
//   t.ok(umdOutput.toString() === umdOutputRef.toString(), 'output file equals reference');
//
//   t.end();
// });
//
// test('builds a un-minified UMD bundle from a React/JSX input file', function(t) {
//   const rollupConfigFileExists = utils.doesFileExist(config.reactJSX.rollupConfigFileDev);
//   t.ok(rollupConfigFileExists, 'config file exists');
//
//   const code = execSync(`${rollupBin} -c ${config.reactJSX.rollupConfigFileDev}`);
//
//   const outputFileExists = utils.doesFileExist(config.reactJSX.outputFileDev);
//   t.ok(outputFileExists, 'rollup-cli created output file');
//
//   const umdOutput = fs.readFileSync(config.reactJSX.outputFileDev).toString();
//   const umdOutputRef = fs.readFileSync(config.reactJSX.outputRefFile).toString();
//
//   t.ok(umdOutput.toString() === umdOutputRef.toString(), 'output file equals reference');
//
//   t.end();
// });
//
// // test('teardown', function(t) {
// //   execSync(`rm -rf ${config.tmpFolder}`);
// //   t.end();
// // });
