import gulp from 'gulp';
import del from 'del';
import gulpSequence from 'gulp-sequence';

import gulpOptions from './gulp.options.js';

import './gulp/server.task.js';
import './gulp/cmsServer.task.js';
import './gulp/html.task.js';
import './gulp/favicon.task.js';
import './gulp/fonts.task.js';
import './gulp/img.task.js';
import './gulp/js.task.js';
import './gulp/scss.task.js';
import './gulp/unit-test.task.js';
import './gulp/wcag.task.js';
import './gulp/shortcode.task.js';
import './gulp/shortcodeServer.task.js';

let defaultTasks = gulpOptions.defaultTasks,
    buildTasks = [],
    serverTasks = [
        'cmsServer:setup',
        'server:setup',
        'shortcodeServer:setup'
    ],
    watchTasks = [
        'shortcode:watch'
    ];
 
gulp.task('default', (cd) => {
    let _watchTasks = defaultTasks.filter((item) => {
        return item.search(':watch') !== -1 || item.search('unitTest') !== -1 || item.toLowerCase().search('server') !== -1;
    });

    buildTasks = defaultTasks.filter((item) => {
        return item.search(':watch') === -1 && item.search('unitTest') === -1 && item.toLowerCase().search('server') === -1;
    });

    watchTasks = watchTasks.concat(_watchTasks);

    if (gulpOptions.htmlTemplate == 'hb')
        watchTasks.push('hb:watch');
    else
        watchTasks.push('nunjucks:watch');

    return gulpSequence(buildTasks, 'shortcode:build', serverTasks, watchTasks, cd);
});

gulp.task('clean', () => del([`${gulpOptions.server.root}**/*`]));

gulp.task('test', gulpOptions.testTasks);
