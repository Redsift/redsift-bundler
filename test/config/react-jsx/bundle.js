const path = require('path');
const config = require('../../../config/rollup/prod');

const entryFile = path.join('test', 'config', 'react-jsx', 'input.js');
const dest = path.join('test', 'tmp', 'react-jsx', 'bundle-output.js');

config.entry = entryFile;
config.dest = dest;

module.exports = config;
