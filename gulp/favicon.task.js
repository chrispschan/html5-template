import gulp from 'gulp';
import favicons from 'gulp-favicons';

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
