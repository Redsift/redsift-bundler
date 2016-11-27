import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

import config from './base';

// Inject the production settings:
config.moduleName = 'TestBundle';
config.plugins[3] = replace({ 'process.env.NODE_ENV': JSON.stringify('production') });
config.plugins.push(uglify());

export default config;
