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

let defaultTasks = gulpOptions.defaultTasks;
 
gulp.task('default', () => {
    if (gulpOptions.htmlTemplate == 'hb') defaultTasks.push('hb:watch');
    else defaultTasks.push('nunjucks:watch');

    gulp.start(defaultTasks, ['cmsServer:setup', 'server:setup']);
});
