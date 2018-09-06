'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const include = require('gulp-include');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const R = require('ramda');
const none = require('through2').obj;

const paths = require('../Config/paths');
const files = require('../Config/files');
const resolvePathTo = require('../Functions/resolvePathTo').resolvePathTo;

const filesToJsProcess = {
  top: R.concat(files.scripts.top.dont, files.scripts.top.use),
  bottom: R.concat(files.scripts.bottom.dont, files.scripts.bottom.use),
};
const isProduction = !!(process.env.NODE_ENV == 'production');


const standaloneScriptTop = () => 
  gulp.src(resolvePathTo(paths.source.scriptsTop, filesToJsProcess.top))
    .pipe(plumber())
    .pipe(include())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(rename({
      prefix: `${files.scripts.prefixes.top}${files.scripts.prefixes.separator}`,
    }))
    .pipe(isProduction ? uglify() : none())
    .pipe(gulp.dest(paths.build.scripts));

const concatScriptTop = () =>
  gulp.src(resolvePathTo(paths.source.scriptsTop, '**/_*.js'))
    .pipe(plumber())
    .pipe(include())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat(`${files.scripts.prefixes.top}${files.scripts.prefixes.separator}bundle.js`))
    .pipe(isProduction ? uglify() : none())
    .pipe(gulp.dest(paths.build.scripts));

const standaloneScriptBottom = () =>
  gulp.src(resolvePathTo(paths.source.scriptsBottom, filesToJsProcess.bottom))
  .pipe(plumber())
  .pipe(include())
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(rename({
    prefix: `${files.scripts.prefixes.bottom}${files.scripts.prefixes.separator}`,
  }))
  .pipe(isProduction ? uglify() : none())
  .pipe(gulp.dest(paths.build.scripts));

const concatScriptBottom = () =>
  gulp.src(resolvePathTo(paths.source.scriptsBottom, '**/_*.js'))
  .pipe(plumber())
  .pipe(include())
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(concat(`${files.scripts.prefixes.bottom}${files.scripts.prefixes.separator}bundle.js`))
  .pipe(isProduction ? uglify() : none())
  .pipe(gulp.dest(paths.build.scripts));

module.exports = {
  standaloneScriptTop,
  concatScriptTop,
  standaloneScriptBottom,
  concatScriptBottom,
};