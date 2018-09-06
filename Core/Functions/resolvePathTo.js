'use strict';

const R = require('ramda');
const path = require('path');

const resolve = (file, folder) =>
  path.resolve(file, folder);

const resolvePath = R.curry(resolve);

const attachFolder = folder => 
  resolvePath(folder);

const attachFileOrArray = (arg, fn) =>
  ((R.is(String, arg) && !R.isEmpty(arg))
    ? fn(arg)
    : R.map(fn, arg));

const resolvePathTo = (folder, arg) => 
  attachFileOrArray(arg, attachFolder(folder));

const curriedResolvePathTo = R.curry(resolvePathTo);

module.exports = {
  curriedResolvePathTo,
  resolvePathTo,
};