import gulp from 'gulp';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import each from 'gulp-each';
import browserify from 'browserify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import eslint from 'gulp-eslint';
import include from 'gulp-include';
import watch from 'gulp-watch';

import gulpOptions from './../gulp.options.js';

import eslintConfig from './../src/eslint.config.js';

const watchFiles = {
        js: gulpOptions.watchAppFolder ? ['./src/js/**/*.js', './src/app/**/*.js', '!./src/js/**/_*.js', '!./src/js/**/*.spec.js', '!./src/js/**/*.min.*', '!./src/js/**/*.es5.js', '!./src/app/**/_*.js', '!./src/app/**/*.spec.js', '!./src/app/**/*.stories.*'] : ['./src/js/**/*.js', '!./src/js/**/_*.js', '!./src/js/**/*.spec.js', '!./src/js/**/*.min.*', '!./src/js/**/*.es5.js'],
        es5: gulpOptions.es5 ? ['./src/js/**/*.js', '!./src/js/**/_*.js', '!./src/js/**/*.spec.js'] : ['./src/js/**/*.es5.js', './src/js/**/*.min.js', '!./src/js/**/_*.es5.js', '!./src/js/**/_*.min.js'],
        import: ['./node_modules', './src/app/'],    // babel import path
        jsInclude: [`${__dirname}/../node_modules`, `${__dirname}/../src/app`],
        jsLint: ['./src/app/**/*.js', './src/js/**/*.js', '!./src/app/**/_*.js', '!./src/app/**/*.spec.js', '!./src/js/**/_*.js', '!./src/js/**/*.spec.js', '!./src/js/**/*.min.*', '!./src/app/**/*.stories.*']
    },
    buildFiles = {
        js: ['./src/js/**/*.js', '!./src/js/**/_*.js', '!./src/js/**/*.spec.js', '!./src/js/**/*.min.*', '!./src/js/**/*.es5.js']
    },
    outputFiles = {
        js: gulpOptions.server.root + gulpOptions.outputFiles.js
    };

// js build
gulp.task(
    'js:build',
    ['js:lint'],
    () => {
        if (gulpOptions.es5)
            return gulp.start(['js:es5:build']);
        else
            return gulp.start(['js:es6:build', 'js:es5:build']);
    }
);

// js es5 build
gulp.task(
    'js:es5:build',
    () =>
        gulp.src(watchFiles.es5)
            .pipe(sourcemaps.init({loadMaps: true}))    // sourcemaps
            .pipe(include({
                extensions: 'js',
                includePaths: watchFiles.jsInclude
            }))
            .pipe(uglify({output: {comments: /^\!|license|License|Copyright|copyright/}}))    // minify
            .pipe(rename(function (path) {
                path.basename = path.basename.replace('.es5', '');
            }))
            .pipe(sourcemaps.write('./'))    // sourcemaps
            .pipe(gulp.dest(outputFiles.js))
);

// js es6 build
gulp.task(
    'js:es6:build',
    () =>
        gulp.src(buildFiles.js)
            .pipe(each(function (content, file, callback) {
                let newContent = content,
                    _path = file.path.replace(file.base, '').split('\\'),
                    _folder = '';
                
                for (let i = 0; i < _path.length - 1; i++)
                    _folder += _path[i] + '/';

                let bundler = browserify(file, {debug: true, paths: watchFiles.import}).transform(babelify);

                bundler.bundle()
                    .on('error', (err) => { console.error(err); this.emit('end'); })
                    .pipe(source(_path[_path.length - 1]))
                    .pipe(buffer())
                    .pipe(sourcemaps.init({loadMaps: true}))    // sourcemaps
                    .pipe(uglify({output: {comments: /^\!|license|License|Copyright|copyright/}}))    // minify
                    .pipe(sourcemaps.write('./'))    // sourcemaps
                    .pipe(gulp.dest(outputFiles.js + '/' + _folder));

                callback(null, newContent);
            }))
);

// js watch
gulp.task('js:watch', () => {
    if (gulpOptions.gulpWatch) {
        return watch(watchFiles.js, () => {
            return gulp.start('js:build');
        });
    } else
        return gulp.watch(watchFiles.js, ['js:build']);
});

// js lint
gulp.task(
    'js:lint',
    () => {
        return gulp.src(watchFiles.jsLint)
            .pipe(eslint(eslintConfig))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    }
);
