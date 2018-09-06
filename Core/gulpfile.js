const gulp = require('gulp');

const dir = require('./Tasks/dir');
const fonts = require('./Tasks/fonts');
const images = require('./Tasks/images');
const plugins = require('./Tasks/plugins');
const versionize = require('./Tasks/versionize');
const scripts = require('./Tasks/scripts');
const styles = require('./Tasks/styles');
const sync = require('./Tasks/sync');
const theme = require('./Tasks/theme');
const watch = require('./Tasks/watch');

const isProduction = !!(process.env.NODE_ENV == 'production');

let revisionAll = gulp.series(versionize.revision.styles, versionize.revision.scripts, versionize.revision.fonts, versionize.revision.images);
revisionAll.description = 'Make a revision of all assets files.';

let rewriteAll = gulp.series(versionize.rewrite.theme, versionize.rewrite.plugins);
rewriteAll.description = 'Rewrite all revisioned files in theme/plugins files.';

let clean = gulp.parallel(dir.cleanBuild, dir.cleanSource);
clean.description = 'Clean all directories defined in Config files.';

let create = gulp.parallel(dir.createSource, dir.createBuild);
clean.description = 'Create all directories defined in Config files.';

let prepare = gulp.series(clean, create);
prepare.description = 'Clean all directories defined in Config files, then create and download WordPress.';

let compileStyles = gulp.parallel(styles.sassFiles, styles.styleCssFile);
compileStyles.description = 'Prepare all SASS and style.css to build.';

let scriptsTop = gulp.parallel(scripts.standaloneScriptTop, scripts.concatScriptTop);
scriptsTop.description = 'Prepare all HEAD scripts to build.';

let scriptsBottom = gulp.parallel(scripts.standaloneScriptBottom, scripts.concatScriptBottom);
scriptsBottom.description = 'Prepare all FOOTER scripts to build.';

let scriptsAll = gulp.series(scriptsTop, scriptsBottom);
scriptsAll.description = 'Prepare all scripts to build.';

let assets = gulp.parallel(fonts, images, scriptsAll, compileStyles);
assets.description = 'Run all process to assets.';

let watchAll = gulp.parallel(watch.plugins, watch.theme, watch.styles, watch.scripts, watch.fonts, watch.images);
watchAll.description = 'Watch all files.';

let serve = gulp.parallel(sync, watchAll);
serve.description = 'Run server and watch all files.';

// let version = gulp.series(revisionAll, rewriteAll, dir.deleteManifestJson);
let version = gulp.series(revisionAll, rewriteAll);
version.description = 'Revision every assets file then rewrite PHP files.';

let dev = gulp.series(dir.cleanBuild, dir.createBuild, plugins, theme, assets, serve);
dev.description = 'Run process to developer.'

let finalize = gulp.series(dir.cleanBuild, dir.createBuild, plugins, theme, assets, version);
finalize.description = 'Run processes to finalize.'

module.exports = {
  'clean:source': dir.cleanSource,
  'clean:build': dir.cleanBuild,
  'clean:all' : clean,
  'create:build': dir.createBuild,
  'create:source': dir.createSource,
  'create:all': create,
  prepare,
  fonts,
  images,
  plugins,
  theme,
  scripts: scriptsAll,
  styles: compileStyles,
  assets,
  serve,
  default: (isProduction ? finalize : dev),
}