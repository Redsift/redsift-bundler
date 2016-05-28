import svgSprite from 'gulp-svg-sprite';
import html2jsx from 'gulp-html2jsx';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import path from 'path';

module.exports = function setupTask(gulp, bundles) {
  function task() {
    bundles.forEach(config => {
      let svgSpriteConfig = config.svgSprite,
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

      let jsxConfig = null;
      if (config.transform && config.transform.jsx) {
        jsxConfig = config.transform.jsx;

        if (!path.isAbsolute(jsxConfig.dest)) {
          jsxConfig.dest = path.join(bundles.workingDir, jsxConfig.dest);
        }
      }
      createSVGSprite({
        gulp,
        src,
        dest,
        svgSpriteConfig: svgSpriteConfig.config,
        jsxConfig
      });
    });

    // NOTE: To not execute a task each time the gulpfile defines a task with
    // gulp.task('task-name', ...) we return a function here, which gets called
    // eventually when calling a task via gulp.
    return task;
  }

  function createSVGSprite({
    gulp,
    srcGlob,
    dest,
    svgSpriteConfig,
    jsxConfig
  }) {
    let stream = gulp.src(srcGlob)
      .pipe(svgSprite(svgSpriteConfig))
      .pipe(gulp.dest(dest));

    // FIXXME: this is very specific at the moment. generalize!
    if (jsxConfig) {
      gulp.src(path.join(dest, 'symbol/svg/sprite.symbol.svg'))
        .pipe(html2jsx(jsxConfig.config))
        .pipe(replace('render: function() {', 'render() {'))
        .pipe(replace('{/*?xml version="1.0" encoding="utf-8"?*/}', ''))
        .pipe(replace(' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"', ''))
        .pipe(replace('<svg>', '<svg style={{display: "none"}}>'))
        .pipe(replace('let Icons = React.createClass({', 'export default class Icons extends React.Component {'))
        .pipe(replace('});', '}'))
        .pipe(rename('_icons.jsx'))
        .pipe(gulp.dest(jsxConfig.dest));
    }

    console.log(`Wrote sprite files to ${jsxConfig.dest}`);
  }
}
