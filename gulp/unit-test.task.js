import fs from 'fs';
import gulp from 'gulp';
import each from 'gulp-each';
import jasmine from 'gulp-jasmine';
import del from 'del';

const watchFiles = {
        import: ['./node_modules', './src/app/'],    // babel import path
        unitTest: ['./src/app/**/*.spec.js', './src/js/**/*.spec.js', '!./src/app/**/_*.spec.js', '!./src/js/**/_*.spec.js']
    },
    outputFiles = {
        unitTest: './src/test/'
    };

gulp.task('unit-test',
    ['unit-test:build'],
    () => {
        return gulp.start(['unit-test:cmd']);
    }
);

// clean test files
gulp.task('unit-test:clean', () => {
    return del([`${outputFiles.unitTest}**/*`]);
});

// unit test build files
gulp.task(
    'unit-test:build',
    () => {
        return gulp.src(['./src/**/*.js', '!./src/test/**/*.js'])
            .pipe(each(function (content, file, callback) {
                let _lines = content.split(`\n`),
                    _path,
                    _folder,
                    _level = file.path.replace(file.base, '').split('\\'),
                    _dot = './',
                    newContent;

                for (let i = 0; i < _level.length - 1; i++)
                    _dot += '../';

                for (let i = 0; i < _lines.length; i++) {
                    if (_lines[i].search('import') === 0) {
                        _path = _lines[i].split(`'`);
                        _folder = _path[1].split('/');

                        if (fs.existsSync(`src/app/${_folder[0]}`))
                            _lines[i] = _lines[i].replace(`'${_path[1]}'`, `'${_dot}app/${_path[1]}'`);
                    }
                }
                    
                newContent = _lines.join(`\n`);

                callback(null, newContent);
            }))
            .pipe(gulp.dest(outputFiles.unitTest));
    }
);

// unit test on cmd
gulp.task('unit-test:cmd', () => gulp.src([outputFiles.unitTest + '**/*.spec.js', '!' + outputFiles.unitTest + '**/_*.spec.js'])
    .pipe(jasmine({
        includeStackTrace: true,
        verbose: true,
        errorOnFail: false
    }))
    .on('jasmineDone', (e) => {    // callback when all unit test end
        gulp.start('unit-test:clean');
    })
);
