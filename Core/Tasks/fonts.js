'use strict';

const gulp = require('gulp');

const paths = require('../Config/paths');
const files = require('../Config/files');
const resolvePathTo = require('../Functions/resolvePathTo').resolvePathTo;

const fonts = () =>{
  
  return gulp.src(resolvePathTo(paths.source.fonts, files.fonts))
    .pipe(gulp.dest(paths.build.fonts));
}

module.exports = fonts;