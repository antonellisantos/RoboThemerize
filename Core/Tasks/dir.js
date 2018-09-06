'use strict';

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const mkdir = require('mkdirp');

const resolvePathTo = require('../Functions/resolvePathTo').resolvePathTo;
const paths = require('../Config/paths');

const cleanBuild = () =>
  new Promise(resolve => {
        const cb = err => {
          if (err) {
            console.log('[ERROR] Task.cleanBuild:', err);
          }
        }

        rimraf(resolvePathTo(paths.build.theme, '*'), cb);
        rimraf(resolvePathTo(paths.build.plugins, '*'), cb);

        resolve();
      });

const cleanSource = () =>
  new Promise(resolve => rimraf(path.resolve(paths.source.root, '*'), err => {
    if (err) {
      console.log('[ERROR] Task.cleanSource:', err);
    }

    resolve();
  }));

const createBuild = () =>
  new Promise(resolve => {
    for (const path in paths.build) {
      if (!fs.existsSync(paths.build[path])) {
        mkdir(paths.build[path], err => {
          if (err) {
            console.log('[ERROR] Task.createBuild:', err);
          }
        });
      }
    }

    resolve();
  });

const deleteManifestJson = () =>
  new Promise(resolve => {
    const cb = err => {
      if (err) {
        console.log('[ERROR] Task.deleteManifestJson:', err);
      }
    }

    rimraf(resolvePathTo(paths.build.assets, 'manifest.json'), cb);

    resolve();
  });

const createSource = () =>
  new Promise(resolve => {
    for (const path in paths.source) {
      if (!fs.existsSync(paths.source[path])) {
        mkdir(paths.source[path], err => {
          if (err) {
            console.log('[ERROR] Task.createSource:', err);
          }
        });
      }
    }

    resolve();
  });

module.exports = {
  cleanBuild,
  cleanSource,
  deleteManifestJson,
  createBuild,
  createSource,
};