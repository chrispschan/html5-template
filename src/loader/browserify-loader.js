const fs = require('fs');
const parseQuery = require('loader-utils').parseQuery;
const browserify = require('browserify');
const babelify = require('babelify');
const path = require('path');

module.exports = async function (source) {
  const queryData = this.resourceQuery ? parseQuery(this.resourceQuery) : {};

  const bundler = browserify(this.resourcePath, {debug: false, paths: [path.dirname('./node_modules'), path.dirname('./src/app/')]}).transform(babelify);

  const result = await bundle(bundler);
  // console.log(result);

  return result;
};

function bundle(bundler) {
  return new Promise(resolve => {
    bundler.bundle((err, buf) => {
      resolve(buf ? buf.toString() : '');
    });
  });
}
