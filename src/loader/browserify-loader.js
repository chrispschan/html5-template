const fs = require('fs');
const getOptions = require('loader-utils').getOptions;
const browserify = require('browserify');
const babelify = require('babelify');
const path = require('path');

module.exports = async function (source) {
  const options = getOptions(this);

  const bundler = browserify(this.resourcePath, {debug: false, paths: options.paths}).transform(babelify);

  const result = await bundle(bundler);

  return result;
};

function bundle(bundler) {
  return new Promise(resolve => {
    bundler.bundle((err, buf) => {
      resolve(buf ? buf.toString() : '');
    });
  });
}
