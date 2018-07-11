import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import each from 'gulp-each';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import eslint from 'gulp-eslint';

import gulpOptions from './../gulp.options.js';

import eslintConfig from './../src/eslint.config.js';

const watchFiles = {
    js: ['./src/js/**/*.js', '!./src/js/**/_*.js'],
    jsLint: ['./src/app/**/*.js', './src/js/**/*.js', '!./src/app/**/_*.js', '!./src/js/**/_*.js']
},
outputFiles = {
    js: gulpOptions.server.root + gulpOptions.outputFiles.js
};

// js build
gulp.task(
    'js:build',
    ['js:lint'],
    () => gulp.src(watchFiles.js)
        .pipe(each(function (content, file, callback) {
            let newContent = '// my comment\n' + content,
            _path = file.path.replace(file.base, '').split('\\'),
            _folder = '';
            
            for (let i=0; i<_path.length-1; i++) {
                _folder += _path[i] + '/';
            }

            let bundler = watchify(browserify(file, {debug: true, paths: watchFiles.import}).transform(babelify));

            bundler.bundle()
                .on('error', (err) => {console.error(err); this.emit('end');})
                .pipe(source(_path[_path.length-1]))
                .pipe(buffer())
                .pipe(sourcemaps.init({loadMaps: true}))    // sourcemaps
                .pipe(uglify({output: {comments: /^\!|license|License|Copyright|copyright/}}))    // minify
                .pipe(sourcemaps.write('./'))    // sourcemaps
                .pipe(gulp.dest(outputFiles.js+'/'+_folder));

            callback(null, newContent);
        }))
);

// js watch
gulp.task('js:watch', () => gulp.watch(watchFiles.js, ['js:build']));

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
