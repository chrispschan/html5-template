import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import moduleImporter from 'sass-module-importer';
import watch from 'gulp-watch';

import gulpOptions from './../gulp.options.js';

const watchFiles = {
        scss: gulpOptions.watchAppFolder ? ['./src/css/**/*.scss', './src/app/**/*.scss', '!./src/css/**/_*.scss', '!./src/app/**/_*.scss'] : ['./src/css/**/*.scss', '!./src/css/**/_*.scss']
    },
    buildFiles = {
        scss: ['./src/css/**/*.scss', '!./src/css/**/_*.scss']
    },
    outputFiles = {
        scss: gulpOptions.server.root + gulpOptions.outputFiles.scss
    };

// scss build
gulp.task(
    'scss:build',
    () => {
        return gulp.src(buildFiles.scss)
            .pipe(sourcemaps.init())    // sourcemaps
            .pipe(sass({importer: moduleImporter(), outputStyle: 'compressed'}).on('error', sass.logError))    // minify --> outputStyle: 'compressed'
            .pipe(sourcemaps.write('./'))    // sourcemaps
            .pipe(gulp.dest(outputFiles.scss));
    }
);

// scss watch
gulp.task('scss:watch', () => {
    if (gulpOptions.gulpWatch) {
        return watch(watchFiles.scss, () => {
            return gulp.start('scss:build');
        });
    } else
        return gulp.watch(watchFiles.scss, ['scss:build']);
});
