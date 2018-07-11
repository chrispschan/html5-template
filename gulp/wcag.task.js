import gulp from 'gulp';
import accessibility from 'gulp-accessibility';

import gulpOptions from './../gulp.options.js';

const outputFiles = {
    html: gulpOptions.server.root + gulpOptions.outputFiles.html
};

// WCAG check
gulp.task('wcag:check', () => {
    let _checkFiles = outputFiles.html;

    _checkFiles += _checkFiles[_checkFiles.length - 1] == '/' ? '**/*.html' : '/**/*.html';

    return gulp.src(_checkFiles)
        .pipe(accessibility(gulpOptions.accessibility))
        .on('error', console.log)
        .pipe(accessibility.report({reportType: 'txt'}))
        .pipe(rename({
            extname: '.txt'
        }))
        .pipe(gulp.dest('reports/wcag'));
});