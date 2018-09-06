'use strict';

const gulp = require('gulp');
const rev = require('gulp-rev');
const del = require('gulp-rev-delete-original');
const rew = require('gulp-rev-rewrite');

const paths = require('../Config/paths');
const files = require('../Config/files');
const resolvePathTo = require('../Functions/resolvePathTo').resolvePathTo;

const revScripts = () =>
  gulp.src(resolvePathTo(paths.build.scripts, files.scripts.build))
    .pipe(rev())
    .pipe(del())
    .pipe(gulp.dest(paths.build.scripts))
    .pipe(rev.manifest({
      merge: true,
      base: paths.build.assets,
      path: resolvePathTo(paths.build.assets,'manifest.json'),
    }))
    .pipe(gulp.dest(paths.build.assets));

const revStyles = () =>
  gulp.src(resolvePathTo(paths.build.styles, files.styles.build))
    .pipe(rev())
    .pipe(del())
    .pipe(gulp.dest(paths.build.styles))
    .pipe(rev.manifest({
      merge: true,
      base: paths.build.assets,
      path: resolvePathTo(paths.build.assets,'manifest.json'),
    }))
    .pipe(gulp.dest(paths.build.assets));

const revImages = () =>
  gulp.src(resolvePathTo(paths.build.images, files.images))
    .pipe(rev())
    .pipe(del())
    .pipe(gulp.dest(paths.build.images))
    .pipe(rev.manifest({
      merge: true,
      base: paths.build.assets,
      path: resolvePathTo(paths.build.assets,'manifest.json'),
    }))
    .pipe(gulp.dest(paths.build.assets));

const revFonts = () =>
  gulp.src(resolvePathTo(paths.build.fonts, files.fonts))
    .pipe(rev())
    .pipe(del())
    .pipe(gulp.dest(paths.build.fonts))
    .pipe(rev.manifest({
      merge: true,
      base: paths.build.assets,
      path: resolvePathTo(paths.build.assets,'manifest.json'),
    }))
    .pipe(gulp.dest(paths.build.assets));

const rewTheme = () => 
  gulp.src(resolvePathTo(paths.build.theme, '**/*'))
    .pipe(rew({
      manifest: gulp.src(resolvePathTo(paths.build.assets, 'manifest.json')),
      replaceInExtensions: files.versionize,
    }))
    .pipe(gulp.dest(paths.build.theme));

const rewPlugins = () =>
  gulp.src(resolvePathTo(paths.build.plugins, '**/*'))
    .pipe(rew({
      manifest: gulp.src(resolvePathTo(paths.build.assets, 'manifest.json')),
      replaceInExtensions: files.versionize,
    }))
    .pipe(gulp.dest(paths.build.plugins));

module.exports = {
  revision: {
    scripts: revScripts,
    styles: revStyles,
    fonts: revFonts,
    images: revImages,
  },
  rewrite: {
    theme: rewTheme,
    plugins: rewPlugins,
  },
};