'use strict';

const browserSync = require('browser-sync');
const R = require('ramda');

const paths = require('../Config/paths');
const files = require('../Config/files');
const resolvePathTo = require('../Functions/resolvePathTo').resolvePathTo;
const mergeAll = require('../Functions/mergeAll');

const filesToSassProcess = R.concat(files.styles.use, files.styles.dont);
const filesToJsProcess = {
  top: R.concat(files.scripts.top.dont, files.scripts.top.use),
  bottom: R.concat(files.scripts.bottom.dont, files.scripts.bottom.use),
};

const filesToSync = mergeAll([
  resolvePathTo(paths.source.scriptsTop, filesToJsProcess.top),
  resolvePathTo(paths.source.scriptsTop, ['**/_*.js']),
  resolvePathTo(paths.source.scriptsBottom, filesToJsProcess.bottom),
  resolvePathTo(paths.source.scriptsBottom, ['**/_*.js']),
  resolvePathTo(paths.source.styles, filesToSassProcess),
  resolvePathTo(paths.source.styles, ['**/style.css']),
  resolvePathTo(paths.source.images, files.images),
  resolvePathTo(paths.source.fonts, files.fonts),
  resolvePathTo(paths.source.theme, files.theme),
  resolvePathTo(paths.source.plugins, files.plugins),
]);

const sync = () =>
  browserSync.init(filesToSync, {
    proxy: "http://localhost:8080/",
    notify: true
  });

module.exports = sync;