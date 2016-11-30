const path = require('path');
const config = require('../../config/rollup/prod');

const entryFile = path.join('test', 'es6', 'input.js');
const dest = path.join('test', 'tmp', 'es6', 'output', 'rollup', 'bundle-output.min.js');

config.entry = entryFile;
config.dest = dest;

module.exports = config;
