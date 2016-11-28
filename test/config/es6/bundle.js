const path = require('path');
const config = require('../../../config/prod');

const entryFile = path.join('test', 'config', 'es6', 'input.js');
const dest = path.join('test', 'tmp', 'es6', 'bundle-output.js');

config.entry = entryFile;
config.dest = dest;

module.exports = config;
