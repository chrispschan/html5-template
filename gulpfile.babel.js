import gulp from 'gulp';

import gulpOptions from './gulp.options.js';

import './gulp/server.task.js';
import './gulp/cmsServer.task.js';
import './gulp/html.task.js';
import './gulp/favicon.task.js';
import './gulp/fonts.task.js';
import './gulp/img.task.js';
import './gulp/js.task.js';
import './gulp/scss.task.js';
import './gulp/wcag.task.js';

let defaultTasks = gulpOptions.defaultTasks,
    watchTasks = ['cmsServer:setup', 'server:setup'];
 
gulp.task('default', () => {
    let _watchTasks = defaultTasks.filter((item) => {
        return item.search(':watch') !== -1 || item.search('unitTest') !== -1 || item.toLowerCase().search('server') !== -1;
    });

    defaultTasks = defaultTasks.filter((item) => {
        return item.search(':watch') === -1 && item.search('unitTest') === -1 && item.toLowerCase().search('server') === -1;
    });

    watchTasks = watchTasks.concat(_watchTasks);

    if (gulpOptions.htmlTemplate == 'hb') watchTasks.push('hb:watch');
    else watchTasks.push('nunjucks:watch');

    gulp.start(defaultTasks, watchTasks);
});

gulp.task('clean', () => del([`${gulpOptions.server.root}**/*`]));
