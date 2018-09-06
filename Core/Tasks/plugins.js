'use strict';

const gulp = require('gulp');

const paths = require('../Config/paths');
const files = require('../Config/files');
const resolvePathTo = require('../Functions/resolvePathTo').resolvePathTo;

const plugins = () =>
  gulp.src(resolvePathTo(paths.source.plugins, files.plugins))
    .pipe(gulp.dest(paths.build.plugins));

module.exports = plugins;