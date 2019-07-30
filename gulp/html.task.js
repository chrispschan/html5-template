import fs from 'fs';
import gulp from 'gulp';
import each from 'gulp-each';
import replace from 'gulp-replace';
import rename from 'gulp-rename';
import htmlbeautify from 'gulp-html-beautify';
import nunjucksRender from 'gulp-nunjucks-render';
import watch from 'gulp-watch';

import manageEnvironment from './../src/manageEnvironment.js';    // nunjucks environment

import gulpOptions from './../gulp.options.js';

const watchFiles = {
        serve: gulpOptions.server.root,
        nunjucks: ['./src/app/'],    // nunjucks partials
        html: gulpOptions.watchAppFolder ? ['./src/html/**/*.html', './src/app/**/*.html', '!./src/html/**/_*.html', '!./src/app/**/_*.html', '!./src/app/**/*.stories.*'] : ['./src/html/**/*.html', '!./src/html/**/_*.html'],
        content: ['./src/data/**/*.json', '!./src/data/**/_*.json']    // html content json
    },
    buildFiles = {
        html: ['./src/html/**/*.html', '!./src/html/**/_*.html']
    },
    outputFiles = {
        fonts: watchFiles.serve + gulpOptions.outputFiles.fonts,
        img: watchFiles.serve + gulpOptions.outputFiles.img,
        babel: gulpOptions.outputFiles.babel,
        js: watchFiles.serve + gulpOptions.outputFiles.js,
        scss: watchFiles.serve + gulpOptions.outputFiles.scss,
        html: watchFiles.serve + gulpOptions.outputFiles.html
    };

let contentPath = watchFiles.content,
    contentData = {
        path: {
            fonts: outputFiles.fonts[outputFiles.fonts - 1] == '/' ? outputFiles.fonts.replace(watchFiles.serve, '/') : outputFiles.fonts.replace(watchFiles.serve, '/') + '/',
            img: outputFiles.img[outputFiles.img - 1] == '/' ? outputFiles.img.replace(watchFiles.serve, '/') : outputFiles.img.replace(watchFiles.serve, '/') + '/',
            js: outputFiles.js[outputFiles.js - 1] == '/' ? outputFiles.js.replace(watchFiles.serve, '/') : outputFiles.js.replace(watchFiles.serve, '/') + '/',
            babel: outputFiles.babel,
            css: outputFiles.scss[outputFiles.scss - 1] == '/' ? outputFiles.scss.replace(watchFiles.serve, '/') : outputFiles.scss.replace(watchFiles.serve, '/') + '/',
            html: outputFiles.html[outputFiles.html - 1] == '/' ? outputFiles.html.replace(watchFiles.serve, '/') : outputFiles.html.replace(watchFiles.serve, '/') + '/'
        }
    };

// nunjucks build
gulp.task(
    'nunjucks:build',
    () => {
        if (Array.isArray(gulpOptions.lang)) {
            if (gulpOptions.lang.length > 0) {
                for (let i = 0; i < gulpOptions.lang.length; i++) {
                    gulp.src(buildFiles.html)
                        .pipe(replace('{% set lang="en" %}', `{% set lang="${gulpOptions.lang[i].lang}" %}`))
                        .pipe(nunjucksRender({
                            path: watchFiles.nunjucks,
                            data: contentData,
                            manageEnv: manageEnvironment
                        }))
                        .pipe(htmlbeautify(gulpOptions.htmlbeautify))
                        .pipe(rename((path) => {
                            if (path.basename.search('.standard') === -1) {
                                if (typeof gulpOptions.lang[i].dirname === 'string' && gulpOptions.lang[i].dirname !== '')
                                    path.dirname = path.dirname === '.' ? gulpOptions.lang[i].dirname : `${gulpOptions.lang[i].dirname}/${path.dirname.search('.') === 0 ? path.dirname.substring(1) : path.dirname}`;
                                if (typeof gulpOptions.lang[i].prefix === 'string' && gulpOptions.lang[i].prefix !== '')
                                    path.prefix = gulpOptions.lang[i].prefix;
                                if (typeof gulpOptions.lang[i].suffix === 'string' && gulpOptions.lang[i].suffix !== '')
                                    path.suffix = gulpOptions.lang[i].suffix;
                            } else {
                                path.basename = path.basename.replace('.standard', '');
                            }
                        }))
                        .pipe(gulp.dest(outputFiles.html));
                }
            } else {
                return gulp.src(buildFiles.html)
                    .pipe(nunjucksRender({
                        path: watchFiles.nunjucks,
                        data: contentData,
                        manageEnv: manageEnvironment
                    }))
                    .pipe(htmlbeautify(gulpOptions.htmlbeautify))
                    .pipe(gulp.dest(outputFiles.html));
            }
        } else {
            return gulp.src(buildFiles.html)
                .pipe(nunjucksRender({
                    path: watchFiles.nunjucks,
                    data: contentData,
                    manageEnv: manageEnvironment
                }))
                .pipe(htmlbeautify(gulpOptions.htmlbeautify))
                .pipe(gulp.dest(outputFiles.html));
        }
    }
);

// nunjucks watch
gulp.task('nunjucks:watch', () => {
    if (gulpOptions.gulpWatch) {
        return watch(watchFiles.html, () => {
            return gulp.start('nunjucks:build');
        });
    } else
        return gulp.watch(watchFiles.html, ['nunjucks:build']);
});

// get content json
gulp.task(
    'content:get',
    () => gulp.src(contentPath)
        .pipe(each(function (content, file, callback) {
            let newContent = content,
                fileArr = file.path.search(/\\/) !== -1 ? file.path.split('\\') : file.path.split('\/'),
                val = fileArr[fileArr.length - 1].replace('.json', '');

            fs.readFile(file.path, 'utf8', function (err, data) {
                contentData[val] = JSON.parse(data.toString('utf8').replace(/^\uFEFF/, ''));
                callback(null, newContent);
            });

            // callback(null, newContent);
        })).on('end', () => {
            // console.log(contentData);
            gulp.start('nunjucks:build');
        })
);

// content json watch
gulp.task('content:watch',
    () => {
        if (gulpOptions.gulpWatch) {
            return watch(watchFiles.content, (event) => {
                contentPath = event.path;

                return gulp.start('content:get');
            });
        } else {
            return gulp.watch(watchFiles.content, (event) => {
                contentPath = event.path;

                return gulp.start('content:get');
            });
        }
    });
