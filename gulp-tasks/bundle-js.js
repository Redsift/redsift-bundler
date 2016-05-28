  import rollup from 'rollup';
  import json from 'rollup-plugin-json';
  import buble from 'rollup-plugin-buble';
  // import babel from 'rollup-plugin-babel';
  import string from 'rollup-plugin-string';
  // import filesize from 'rollup-plugin-filesize';
  import uglify from 'rollup-plugin-uglify';
  import nodeResolve from 'rollup-plugin-node-resolve';
  import includePaths from 'rollup-plugin-includepaths';
  import commonjs from 'rollup-plugin-commonjs';
  import path from 'path';
  import _ from 'lodash';

  // let closureCompiler = require('gulp-closure-compiler');

  // let includePathOptions = {
  //     paths: ['./components'],
  //     external: [],
  //     extensions: ['.js']
  // };

  // Don't use 'export default ...' here, as it does not work with the conditional
  // 'require' in the calling gulpfile
  module.exports = function setupTask(gulp, bundles) {
    function task() {
      bundles.forEach(config => {
        config.formats.forEach(format => {
          let moduleName = config.moduleNameJS,
            dest = null,
            src = null;

          if (!path.isAbsolute(config.mainJS.indexFile)) {
            src = path.join(bundles.workingDir, config.mainJS.indexFile);
          } else {
            src = config.mainJS.indexFile;
          }

          if (format === 'es6') {
            if (!path.isAbsolute(config.outputFolder)) {
              dest = path.join(bundles.workingDir, config.outputFolder, 'js', config.name || '', `${config.mainJS.name}.es2015.js`);
            } else {
              dest = path.join(config.outputFolder, 'js', config.name || '', `${config.mainJS.name}.es2015.js`);
            }

            bundleES6({
              indexFile: src,
              dest,
              externalMappings: config.externalMappings
            });
          } else {
            if (!path.isAbsolute(config.outputFolder)) {
              dest = path.join(bundles.workingDir, config.outputFolder, 'js', config.name || '', `${config.mainJS.name}.${format}-es2015.js`);
            } else {
              dest = path.join(config.outputFolder, 'js', config.name || '', `${config.mainJS.name}.${format}-es2015.js`);
            }
            transpileES6({
              indexFile: src,
              dest,
              format,
              moduleName,
              externalMappings: config.externalMappings
            });
          }
        });
      });
    }

    // NOTE: To not execute a task each time the gulpfile defines a task with
    // gulp.task('task-name', ...) we return a function here, which gets called
    // eventually when calling a task via gulp.
    return task;
  }

  function bundleES6({
    indexFile,
    dest,
    externalMappings
  }) {
    // console.log('[bundleES6] src: %s | dest: %s', indexFile, dest);

    // All external mappings have to be skipped by the nodeResolve plugin. Otherwise
    // the plugin would search for them in node_modules and complain if they are not found.
    let nodeResolveSkips = _.map(externalMappings, function(value, key) {
      return key;
    });

    rollup.rollup({
      entry: indexFile,
      external: [],
      plugins: [
        json(),
        string({
          extensions: ['.tmpl']
        }),
        // includePaths(includePathOptions),
        nodeResolve({
          jsnext: true,
          main: true,
          skip: nodeResolveSkips
        }),
        commonjs(),
        // filesize()
      ]
    }).then(function(bundle) {
      bundle.write({
        format: 'es6',
        dest
      });
    }).catch(function(err) {
      console.log(`rollup err: ${err}`);
    });
  }

  function transpileES6({
    indexFile,
    dest,
    format,
    moduleName,
    externalMappings
  }) {
    // console.log('[transpileES6] src: %s | dest: %s', indexFile, dest);

    // All external mappings have to be skipped by the nodeResolve plugin. Otherwise
    // the plugin would search for them in node_modules and complain if they are not found.
    let nodeResolveSkips = _.map(externalMappings, function(value, key) {
      return key;
    });

    rollup.rollup({
      entry: indexFile,
      external: [],
      plugins: [
        json(),
        string({
          extensions: ['.tmpl']
        }),
        // includePaths(includePathOptions),
        nodeResolve({
          jsnext: true,
          main: true,
          skip: nodeResolveSkips
        }),
        commonjs(),
        // CAUTION: make sure to initialize all file transforming additional plugins
        // BEFORE babel() or buble(). Otherwise the transpiler will consume the
        //imported files first.
        // babel(),
        buble(),
        // filesize()
      ]
    }).then(function(bundle) {
      bundle.write({
        format,
        moduleName,
        globals: externalMappings,
        dest
      });
    }).catch(function(err) {
      console.log(`rollup err: ${err}`);
    });

    // FIXXME: use closure compiler to minify JS!
    // .pipe(closureCompiler({
    //     compilerPath: 'bower_components/closure-compiler/compiler.jar',
    //     fileName: 'redsift-global.es5.min.js',
    //     continueWithWarnings: true
    // }))

    rollup.rollup({
      entry: indexFile,
      external: [],
      plugins: [
        json(),
        string({
          extensions: ['.tmpl']
        }),
        // includePaths(includePathOptions),
        nodeResolve({
          jsnext: true,
          main: true,
          skip: nodeResolveSkips
        }),
        commonjs(),
        // CAUTION: make sure to initialize all file transforming additional plugins
        // BEFORE babel() or buble(). Otherwise the transpiler will consume the
        //imported files first.
        // babel(),
        buble(),
        // filesize(),
        uglify()
      ]
    }).then(function(bundle) {
      const dirname = path.dirname(dest),
        basename = path.basename(dest, '.js'),
        dest = path.join(dirname, basename) + '.min.js';

      bundle.write({
        format,
        moduleName,
        globals: externalMappings,
        dest
      });
    }).catch(function(err) {
      console.log(`rollup err: ${err}`);
    });
  }
