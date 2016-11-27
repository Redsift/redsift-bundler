import replace from 'rollup-plugin-replace';
import config from './base';

// Inject the production settings:
config.moduleName = 'TestBundle';

export default config;
