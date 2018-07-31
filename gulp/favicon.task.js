import gulp from 'gulp';
import favicons from 'gulp-favicons';
import watch from 'gulp-watch';

import gulpOptions from './../gulp.options.js';

const watchFiles = {
    favicon: './src/favicon.png'
};

// favicon build
gulp.task(
    'favicon:build',
    () => gulp.src(watchFiles.favicon)
        .pipe(favicons(gulpOptions.favicon))
        .pipe(gulp.dest(gulpOptions.server.root))
);

// favicon watch
gulp.task('favicon:watch', () => {
    if (gulpOptions.gulpWatch)
        return watch(watchFiles.favicon, () => gulp.start('favicon:copy'));
    else
        return gulp.watch(watchFiles.favicon, () => gulp.start('favicon:copy'));
});
