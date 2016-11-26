import config from './base';
import uglify from 'rollup-plugin-uglify';
const path = require('path');

const entryFile = path.join('test', 'config', 'umd-input.js');
const dest = path.join('tmp', 'umd-output.js');

config.entry = entryFile;
config.format = 'umd';
config.moduleName = 'TestBundle';
config.dest = dest
config.plugins.push(uglify());

export default config;
