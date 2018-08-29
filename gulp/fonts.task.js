import gulp from 'gulp';
import watch from 'gulp-watch';

import gulpOptions from './../gulp.options.js';

const watchFiles = {
        fonts: ['./src/fonts/**/*', '!./src/fonts/**/_*']
    },
    outputFiles = {
        fonts: gulpOptions.server.root + gulpOptions.outputFiles.fonts
    },
    fontsSource = './src/fonts';
let fontsPath = watchFiles.fonts;

// font copy
gulp.task('fonts:copy', () => gulp.src(fontsPath, {base: fontsSource}).pipe(gulp.dest(outputFiles.fonts)));

// fonts watch
gulp.task('fonts:watch', () => {
    if (gulpOptions.gulpWatch) {
        return watch(watchFiles.fonts, (event) => {
            fontsPath = event.path;

            return gulp.start('fonts:copy');
        });
    } else {
        return gulp.watch(watchFiles.fonts, (event) => {
            fontsPath = event.path;
            
            return gulp.start('fonts:copy');
        });
    }
});
