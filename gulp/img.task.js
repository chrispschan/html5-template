import gulp from 'gulp';

import gulpOptions from './../gulp.options.js';

const watchFiles = {
    img: ['./src/img/**/*', '!./src/img/**/_*', '!./src/img/_**/*']
},
outputFiles = {
    img: gulpOptions.server.root + gulpOptions.outputFiles.img
};

// image copy
gulp.task('img:copy', () => gulp.src(watchFiles.img).pipe(gulp.dest(outputFiles.img)));
