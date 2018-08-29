import gulp from 'gulp';
import watch from 'gulp-watch';

import gulpOptions from './../gulp.options.js';

const watchFiles = {
        img: ['./src/img/**/*', '!./src/img/**/_*', '!./src/img/_**/*']
    },
    outputFiles = {
        img: gulpOptions.server.root + gulpOptions.outputFiles.img
    },
    imgSource = './src/img';
let imgPath = watchFiles.img;

// image copy
gulp.task('img:copy', () => gulp.src(imgPath, {base: imgSource}).pipe(gulp.dest(outputFiles.img)));

// image watch
gulp.task('img:watch', () => {
    if (gulpOptions.gulpWatch) {
        return watch(watchFiles.img, (event) => {
            imgPath = event.path;

            return gulp.start('img:copy');
        });
    } else {
        return gulp.watch(watchFiles.img, (event) => {
            imgPath = event.path;

            return gulp.start('img:copy');
        });
    }
});
