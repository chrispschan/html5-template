import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import moduleImporter from 'sass-module-importer';

import gulpOptions from './../gulp.options.js';

const watchFiles = {
    scss: ['./src/css/**/*.scss', '!./src/css/**/_*.scss']
},
outputFiles = {
    scss: gulpOptions.server.root + gulpOptions.outputFiles.scss
};

// scss build
gulp.task(
    'scss:build', 
    () =>    {
        return gulp.src(watchFiles.scss)
            .pipe(sourcemaps.init())    // sourcemaps
            .pipe(sass({importer: moduleImporter(), outputStyle: 'compressed'}).on('error', sass.logError))    // minify --> outputStyle: 'compressed'
            .pipe(sourcemaps.write('./'))    // sourcemaps
            .pipe(gulp.dest(outputFiles.scss));
    }
);

// scss watch
gulp.task('scss:watch', () => gulp.watch(watchFiles.scss, ['scss:build']));
