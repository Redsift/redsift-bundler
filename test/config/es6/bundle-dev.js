import path from 'path';
import config from '../dev';

const entryFile = path.join('test', 'config', 'es6', 'input.js');
const dest = path.join('tmp', 'es6', 'bundle-dev-output.js');

config.entry = entryFile;
config.dest = dest;

export default config;
