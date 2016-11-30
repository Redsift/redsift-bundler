const path = require('path');
const config = require('../../config/rollup/prod');

const entryFile = path.join('test', 'react-jsx', 'input.js');
const dest = path.join('test', 'tmp', 'react-jsx', 'output', 'rollup', 'bundle-output.min.js');

config.entry = entryFile;
config.dest = dest;

module.exports = config;
