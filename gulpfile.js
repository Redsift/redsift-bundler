'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    path = require('path'),
    argv = require('yargs')
    .usage('Usage: $0 -c [config-file]')
    .demand(['c'])
    .describe('c', 'Bundle configuration file')
    .argv;

var bundleConfig = require(argv.c);

function getTask(task) {
    return require(path.join(__dirname, './gulp-tasks/' + task))(gulp, bundleConfig);
}

gulp.task('bundle-js', getTask('bundle-js'));
// gulp.task('bundle-css', getTask('bundle-css'));

gulp.task('css-watch', ['bundle-css'], function() {
    browserSync.reload('*.css');
});

gulp.task('js-watch', ['bundle-js'], function() {
    browserSync.reload('*.js');
});

gulp.task('serve', ['default', 'browser-sync'], function() {
    gulp.watch(['./components/**/*.{import.styl,styl,css}', './bundles/**/*.{import.styl,styl,css}'], ['css-watch']);
    gulp.watch(['./components/**/*.{js,tmpl}', './bundles/**/*.{js,tmpl}'], ['js-watch']);
    gulp.watch('./samples/**/*.html').on('change', function() {
        browserSync.reload('*.html');
    });
});

// gulp.task('build', ['bundle-js', 'bundle-css']);
gulp.task('build', ['bundle-js']);

gulp.task('clean', function() {
    return del(['dist/**']);
});

gulp.task('default', ['build']);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: ['./samples', './dist', './assets'],
            directory: true
        }
    });
});
