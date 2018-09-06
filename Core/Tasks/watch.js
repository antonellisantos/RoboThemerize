'use strict';

const gulp = require('gulp');
const R = require('ramda');

const fontsF = require('./fonts');
const imagesF = require('./images');
const pluginsF = require('./plugins');
const scriptsF = require('./scripts');
const stylesF = require('./styles');
const themeF = require('./theme');

const paths = require('../Config/paths');
const files = require('../Config/files');
const resolvePathTo = require('../Functions/resolvePathTo').resolvePathTo;

const filesToSassProcess = R.concat(files.styles.use, files.styles.dont);
const filesToJsProcess = {
  top: R.concat(files.scripts.top.dont, files.scripts.top.use),
  bottom: R.concat(files.scripts.bottom.dont, files.scripts.bottom.use),
};

const styles = () => {
  gulp.watch(resolvePathTo(paths.source.styles, filesToSassProcess), stylesF.sassFiles);
  gulp.watch(resolvePathTo(paths.source.styles, '**/style.css'), stylesF.styleCssFile);
};

const scripts = () => {
  gulp.watch(resolvePathTo(paths.source.scriptsTop, filesToJsProcess.top), scriptsF.standaloneScriptTop);
  gulp.watch(resolvePathTo(paths.source.scriptsTop, '**/_*.js'), scriptsF.concatScriptTop);
  gulp.watch(resolvePathTo(paths.source.scriptsBottom, filesToJsProcess.bottom), scriptsF.standaloneScriptBottom);
  gulp.watch(resolvePathTo(paths.source.scriptsBottom, '**/_*.js'), scriptsF.concatScriptBottom);
};

const images = () =>
  gulp.watch(resolvePathTo(paths.source.images, files.images), imagesF);

const fonts = () =>
  gulp.watch(resolvePathTo(paths.source.fonts, files.fonts), fontsF);

const plugins = () =>
  gulp.watch(resolvePathTo(paths.source.plugins, files.plugins), pluginsF);

const theme = () =>
  gulp.watch(resolvePathTo(paths.source.theme, files.theme), themeF);

module.exports = {
  styles,
  scripts,
  images,
  fonts,
  plugins,
  theme,
};