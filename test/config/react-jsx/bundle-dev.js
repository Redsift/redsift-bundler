const path = require('path');
const config = require('../../../config/dev');

const entryFile = path.join('test', 'config', 'react-jsx', 'input.js');
const dest = path.join('test', 'tmp', 'react-jsx', 'bundle-dev-output.js');

config.entry = entryFile;
config.dest = dest;

module.exports = config;
