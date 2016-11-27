import path from 'path';
import config from '../../../config/prod';

const entryFile = path.join('test', 'config', 'es6', 'input.js');
const dest = path.join('test', 'tmp', 'es6', 'bundle-output.js');

config.entry = entryFile;
config.dest = dest;

export default config;
