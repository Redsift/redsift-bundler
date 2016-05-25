var svgSprite = require('gulp-svg-sprite'),
    path = require('path'),
    _ = require('lodash');

module.exports = function setupTask(gulp, bundles) {
    function task() {
        for (var idx = 0; idx < bundles.length; idx++) {
            var svgSpriteConfig = bundles[idx].svgSprite,
                src = null,
                dest = null;

            if (!path.isAbsolute(svgSpriteConfig.src)) {
                src = path.join(bundles.workingDir, svgSpriteConfig.src);
            } else {
                src = svgSpriteConfig.src;
            }

            if (!path.isAbsolute(svgSpriteConfig.src)) {
                dest = path.join(bundles.workingDir, svgSpriteConfig.dest);
            } else {
                dest = svgSpriteConfig.dest;
            }

            createSVGSprite(gulp, src, dest, svgSpriteConfig.config);
        }
    }

    // NOTE: To not execute a task each time the gulpfile defines a task with
    // gulp.task('task-name', ...) we return a function here, which gets called
    // eventually when calling a task via gulp.
    return task;
}

function createSVGSprite(gulp, srcGlob, dest, svgSpriteConfig) {
    gulp.src(srcGlob)
        .pipe(svgSprite(svgSpriteConfig))
        .pipe(gulp.dest(dest));

    console.log('Wrote sprite files to %s');
}
