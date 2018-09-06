'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGiflossy = require('imagemin-giflossy');
const imageminZopfli = require('imagemin-zopfli');

const paths = require('../Config/paths');
const files = require('../Config/files');
const resolvePathTo = require('../Functions/resolvePathTo').resolvePathTo;

const images = () =>
  gulp.src(resolvePathTo(paths.source.images, files.images))
    .pipe(imagemin([
      imageminPngquant({
        speed: 1,
        quality: 98
      }),
      imageminZopfli({
        more: true
      }),
      imageminGiflossy({
        optimizationLevel: 3,
        optimize: 3,
        lossy: 2
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imageminMozjpeg({
        quality: 90
      })
    ]))
    .pipe(gulp.dest(paths.build.images));

module.exports = images;