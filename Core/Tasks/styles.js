'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const easyImport = require('postcss-easy-import');
const presetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const reload = require('browser-sync').reload;
const R = require('ramda');

const paths = require('../Config/paths');
const files = require('../Config/files');
const resolvePathTo = require('../Functions/resolvePathTo').resolvePathTo;

const filesToSassProcess = R.concat(files.styles.use, files.styles.dont);
const isProduction = !!(process.env.NODE_ENV == 'production');
const postCssPlugins = [
  easyImport,
  presetEnv({
    features: {
      colorHexAlpha: false,
    },
  }),
  ...(isProduction ? [cssnano()] : []),
];

const sassFiles = () => 
  gulp.src(resolvePathTo(paths.source.styles, filesToSassProcess))
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(postcss(postCssPlugins))
    .pipe(gulp.dest(paths.build.styles))
    .pipe(reload({
      stream: true,
    }));

const styleCssFile = () =>
  gulp.src(resolvePathTo(paths.source.styles , '**/style.css'))
  .pipe(plumber())
  .pipe(postcss(postCssPlugins))
  .pipe(gulp.dest(paths.build.theme))
  .pipe(reload({
    stream: true,
  }));

module.exports = {
  sassFiles,
  styleCssFile,
};
