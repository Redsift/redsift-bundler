var stylus = require('gulp-stylus'),
  concat = require('gulp-concat'),
  minifyCss = require('gulp-cleancss'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  plumber = require('gulp-plumber'),
  path = require('path'),
  mergeStream = require('merge-stream');

module.exports = function setupTask(gulp, bundles, bundlerOpts) {
  function task() {
    var gulpStream = mergeStream(); // creates a new stream

    for (var idx = 0; idx < bundles.length; idx++) {
      var config = bundles[idx];

      if (!config.styles) {
        continue;
      }

      for (var i = 0; i < config.styles.length; i++) {
        var style = config.styles[i],
          dest = null,
          src = null,
          mapsDest = null,
          outputSubFolder = (bundles.length > 1) ? style.name : '';

          console.log('bundles.length: ' + bundles.length);
          
        if (!path.isAbsolute(config.outputFolder)) {
          dest = path.join(bundlerOpts.workingDir, config.outputFolder, 'css', outputSubFolder);
        } else {
          dest = path.join(config.outputFolder, 'css', outputSubFolder);
        }

        if (!path.isAbsolute(style.indexFile)) {
          src = path.join(bundlerOpts.workingDir, style.indexFile);
        } else {
          src = style.indexFile;
        }

        if (!path.isAbsolute(config.mapsDest)) {
          mapsDest = path.join(bundlerOpts.workingDir, config.mapsDest);
        } else {
          mapsDest = config.mapsDest;
        }

        console.log('[bundle-css] index file:  ' + src);
        console.log('[bundle-css] dest folder: ' + dest);
        console.log('[bundle-css] map folder:  ' + mapsDest);

        var cssStream = bundleStyles(gulp, {
          name: style.name,
          dest: dest,
          indexFile: src,
          mapsDest: config.mapsDest
        });
        gulpStream.add(cssStream);
      }
    }

    return gulpStream.isEmpty() ? null : gulpStream;
  }

  // NOTE: To not execute a task each time the gulpfile defines a task with
  // gulp.task('task-name', ...) in the gulpfile we return a function here,
  // which gets called eventually when executing a task via gulp.
  return task;
}

function bundleStyles(gulp, opts) {
  return gulp.src([
      './node_modules/normalize.css/**.css',
      opts.indexFile
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(concat(opts.name + '.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(opts.dest))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifyCss({
      compatibility: '*',
      roundingPrecision: 4,
      keepSpecialComments: 0
    }))
    .pipe(sourcemaps.write(opts.mapsDest))
    .pipe(gulp.dest(opts.dest));
}
