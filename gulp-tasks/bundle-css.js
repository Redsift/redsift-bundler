import stylus from 'gulp-stylus';
import concat from 'gulp-concat';
import minifyCss from 'gulp-cleancss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import path from 'path';
import mergeStream from 'merge-stream';

// Don't use 'export default ...' here, as it does not work with the conditional
// 'require' in the calling gulpfile
module.exports = function setupTask(gulp, bundles) {
  function task() {
    var gulpStream = mergeStream(); // creates a new stream

    bundles.forEach(config => {
      if (config.styles) {
        config.styles.forEach(style => {
          var dest = null,
            src = null;

          if (!path.isAbsolute(config.outputFolder)) {
            dest = path.join(bundles.workingDir, config.outputFolder, 'css', config.name);
          } else {
            dest = path.join(config.outputFolder, 'css', config.name);
          }

          if (!path.isAbsolute(style.indexFile)) {
            src = path.join(bundles.workingDir, style.indexFile);
          } else {
            src = style.indexFile;
          }

          var cssStream = bundleStyles(gulp, {
            name: style.name,
            dest: dest,
            indexFile: src,
            mapsDest: config.mapsDest
          });
          gulpStream.add(cssStream);
        });
      }
    });

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
