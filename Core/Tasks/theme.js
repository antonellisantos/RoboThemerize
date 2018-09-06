'use strict';

const gulp = require('gulp');

const paths = require('../Config/paths');
const files = require('../Config/files');
const resolvePathTo = require('../Functions/resolvePathTo').resolvePathTo;

const theme = () =>
  gulp.src(resolvePathTo(paths.source.theme, files.theme))
    .pipe(gulp.dest(paths.build.theme));

module.exports = theme;