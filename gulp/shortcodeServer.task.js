import gulp from 'gulp';
import browserSync from 'browser-sync';
import ssi from 'connect-ssi';

import gulpOptions from './../gulp.options.js';

const serve = browserSync.create();

let options = {
        serve: {
            server: './shortcode/',
            port: gulpOptions.shortcodeServer.port,
            baseDir: './shortcode/',
            open: false,
            ui: false
        }
    },
    gulpApi = [ssi({
        baseDir: options.serve.server == './' ? __dirname + '/..' : __dirname + '/..' + options.serve.server.replace('./', '/'),
        ext: '.html'
    })];

options.serve.middleware = gulpApi;

// local server setup
gulp.task('shortcodeServer:setup', () => serve.init(options.serve));
