import gulp from 'gulp';
import browserSync from 'browser-sync';
import ssi from 'connect-ssi';

import gulpOptions from './../gulp.options.js';
import gulpApi from './server.api.js';

const serve = browserSync.create();

let options = {
    serve: {
        server: gulpOptions.server.root,
        port: gulpOptions.server.port,
        baseDir: gulpOptions.server.root,
        ui: false
    }
};

gulpApi.push(ssi({
    baseDir: gulpOptions.server.root == './' ? __dirname : __dirname + gulpOptions.server.root.replace('./', '/'),
    ext: '.html'
}));

options.serve.middleware = gulpApi;

// local server setup
gulp.task('server:setup', () => serve.init(options.serve));
