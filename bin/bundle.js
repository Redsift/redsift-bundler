#!/usr/bin/env node

console.log('starting bundling');

var shell = require('shelljs'),
    path = require('path'),
    argv = require('yargs')
    .usage('Usage: $0 -c [config-file]')
    .demand(['c'])
    .describe('c', 'Bundle configuration file')
    .argv;

var gulpfile = path.join(__dirname, '..', 'gulpfile.js'),
    exec = 'gulp --gulpfile ' + gulpfile + ' -c ' + argv.c;

console.log('exec: ' + exec);

shell.exec(exec);
