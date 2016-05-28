import gulp from 'gulp';
import BrowserSync from 'browser-sync';
import del from 'del';
import path from 'path';
import yargs from 'yargs';

const browserSync = BrowserSync.create();
const argv = yargs.usage('Usage: $0 -c [config-file]')
  .demand(['c'])
  .describe('c', 'Bundle configuration file')
  .describe('w', 'Bundle working directory (i.e. paths in bundle config file are relative to this)')
  .argv;

let bundleConfigPath = null,
  bundleConfig = null;

if (argv.w && argv.c) {
  bundleConfigPath = path.join(argv.w, argv.c);
  console.log('[redsift-bundler] Loading bundle config from: ' + bundleConfigPath);

  bundleConfig = require(bundleConfigPath);
  bundleConfig['workingDir'] = argv.w;
}


function getTask(task) {
  return require(path.join(__dirname, './gulp-tasks/' + task))(gulp, bundleConfig);
}

gulp.task('bundle-js', getTask('bundle-js'));
gulp.task('bundle-css', getTask('bundle-css'));
gulp.task('svg-sprite', getTask('svg-sprite'));

gulp.task('css-watch', ['bundle-css'], function() {
  browserSync.reload('*.css');
});

gulp.task('js-watch', ['bundle-js'], function() {
  browserSync.reload('*.js');
});

gulp.task('serve', ['default', 'browser-sync'], function() {
  // gulp.watch(['./components/**/*.{import.styl,styl,css}', './bundles/**/*.{import.styl,styl,css}'], ['css-watch']);
  // gulp.watch(['./components/**/*.{js,tmpl}', './bundles/**/*.{js,tmpl}'], ['js-watch']);
  gulp.watch(path.join(bundleConfig.workingDir, '/samples/**/*.html')).on('change', function() {
    browserSync.reload('*.html');
  });
});

gulp.task('build', ['bundle-js', 'bundle-css']);

gulp.task('clean', function() {
  return del(['dist/**']);
});

gulp.task('default', ['build']);

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: [
        path.join(bundleConfig.workingDir, './samples'),
        path.join(bundleConfig.workingDir, './dist'),
        path.join(bundleConfig.workingDir, './assets')
      ],
      directory: true
    }
  });
});
