const test = require('@redsift/tape-reel')(null, null, 'rollup-cli');
const shell = require('shelljs');
const path = require('path');

var gulpfile = path.join(__dirname, '..', 'gulpfile.js');

test('create bundle-test1', function(t) {
  const gulpfile = 'gulpfile.js';
  const workingDir = path.join('test', 'config');
  const configFile = path.join('bundle-test1.config.js'); // NOTE: relativ to workingDir
  const exec = './node_modules/.bin/gulp --gulpfile ' + gulpfile + ' -c ' + configFile + ' -w ' + workingDir + ' build';

  console.log('exec: ' + exec);

  shell.exec(exec);

  t.end();
});
