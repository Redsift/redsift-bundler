import path from 'path';
import config from '../../../config/prod';

const entryFile = path.join('test', 'config', 'react-jsx', 'input.js');
const dest = path.join('test', 'tmp', 'react-jsx', 'bundle-output.js');

config.entry = entryFile;
config.dest = dest;

export default config;
