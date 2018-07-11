import gulp from 'gulp';

import gulpOptions from './../gulp.options.js';

const watchFiles = {
    fonts: ['./src/fonts/**/*', '!./src/fonts/**/_*']
},
outputFiles = {
    fonts: gulpOptions.server.root + gulpOptions.outputFiles.fonts
};

// font copy
gulp.task('fonts:copy', () => gulp.src(watchFiles.fonts).pipe(gulp.dest(outputFiles.fonts)));
