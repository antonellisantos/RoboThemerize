'use strict';

const R = require('ramda');

const mergeAll = array => {
  let base = [];

  R.forEach(a => {
    base = R.concat(a, base);
  }, array);

  return base;
};

module.exports = mergeAll;