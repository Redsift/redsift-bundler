const test = require('@redsift/tape-reel')(null, null, 'rollup-cli');
const path = require('path');
const fs = require('fs');
const execSync = require('child_process').execSync;
const utils = require('./lib/utils');

const rollupBin = './node_modules/.bin/rollup';
const config = {
  umdConfigFile: path.join('test', 'config', 'umd.js'),
  umdInputFile: path.join('test', 'config', 'umd-input.js'),
  umdOutputRefFile: path.join('test', 'config', 'umd-output-ref.js'),
  umdOutputFile: path.join('tmp', 'umd-output.js'),
  tmpFolder: path.join('tmp')
}

test('setup', function(t) {
  execSync(`rm -rf ${config.tmpFolder}`);
  t.end();
});

test('builds a minified UMD bundle', function(t) {
  const umdConfigFileExists = utils.doesFileExist(config.umdConfigFile);
  t.ok(umdConfigFileExists, 'config file exists');

  const code = execSync(`${rollupBin} -c ${config.umdConfigFile}`);

  const umdOutputFileExists = utils.doesFileExist(config.umdOutputFile);
  t.ok(umdOutputFileExists, 'rollup-cli created output file');

  const umdOutput = fs.readFileSync(config.umdOutputFile).toString();
  const umdOutputRef = fs.readFileSync(config.umdOutputRefFile).toString();

  t.ok(umdOutput.toString() === umdOutputRef.toString(), 'output file equals reference');

  t.end();
});

test('teardown', function(t) {
  execSync(`rm -r ${config.tmpFolder}`);
  t.end();
});
