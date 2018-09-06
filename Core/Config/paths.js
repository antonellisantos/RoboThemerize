'use strict';

const fs = require('fs');

const resolvePathTo = require('../Functions/resolvePathTo').resolvePathTo;
const curriedResolvePathTo = require('../Functions/resolvePathTo').curriedResolvePathTo;
const infos = require('../../package.json');

const rootDir = resolvePathTo(fs.realpathSync(process.cwd()), '../');
const resolvePath = curriedResolvePathTo(rootDir);

module.exports = {
  source: {
    root: resolvePath('./Source'),
    assets: resolvePath('./Source/assets'),
    scriptsBase: resolvePath('./Source/assets/scripts'),
    scriptsTop: resolvePath('./Source/assets/scripts/top'),
    scriptsBottom: resolvePath('./Source/assets/scripts/bottom'),
    styles: resolvePath('./Source/assets/styles'),
    images: resolvePath('./Source/assets/images'),
    fonts: resolvePath('./Source/assets/fonts'),
    plugins: resolvePath('./Source/plugins'),
    theme: resolvePath('./Source/theme'),
  },
  build: {
    assets: resolvePath(`./Build/wp-content/themes/${infos.name}_${infos.version}/assets`),
    scripts: resolvePath(`./Build/wp-content/themes/${infos.name}_${infos.version}/assets/scripts`),
    styles: resolvePath(`./Build/wp-content/themes/${infos.name}_${infos.version}/assets/styles`),
    images: resolvePath(`./Build/wp-content/themes/${infos.name}_${infos.version}/assets/images`),
    fonts: resolvePath(`./Build/wp-content/themes/${infos.name}_${infos.version}/assets/fonts`),
    theme: resolvePath(`./Build/wp-content/themes/${infos.name}_${infos.version}`),
    plugins: resolvePath('./Build/wp-content/plugins'),
  }
};