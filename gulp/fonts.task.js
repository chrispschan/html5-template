import gulp from 'gulp';
import watch from 'gulp-watch';

import gulpOptions from './../gulp.options.js';

const watchFiles = {
        fonts: ['./src/fonts/**/*', '!./src/fonts/**/_*']
    },
    outputFiles = {
        fonts: gulpOptions.server.root + gulpOptions.outputFiles.fonts
    };

// font copy
gulp.task('fonts:copy', () => gulp.src(watchFiles.fonts).pipe(gulp.dest(outputFiles.fonts)));

// fonts watch
gulp.task('fonts:watch', () => {
    if (gulpOptions.gulpWatch) {
        return watch(watchFiles.fonts, (event) => {
            return gulp.start('fonts:copy');
        });
    } else {
        return gulp.watch(watchFiles.fonts, (event) => {
            return gulp.start('fonts:copy');
        });
    }
});
