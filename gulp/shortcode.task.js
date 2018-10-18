import fs from 'fs';
import gulp from 'gulp';
import del from 'del';
import each from 'gulp-each';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import moduleImporter from 'sass-module-importer';
import htmlbeautify from 'gulp-html-beautify';
import hb from 'gulp-hb';
import nunjucksRender from 'gulp-nunjucks-render';
import watch from 'gulp-watch';
import highlight from 'gulp-prism';
import gulpSequence from 'gulp-sequence';

import helpers from './../src/helpers.js';    // handlebars helpers
import manageEnvironment from './../src/manageEnvironment.js';    // nunjucks environment

import gulpOptions from './../gulp.options.js';

import {scss2json} from './json.function.js';

const watchFiles = {
        serve: './shortcode/',
        hb: './src/app/**/*.{hbs,handlebars}',    // handlebars partials
        nunjucks: ['./src/app/'],    // nunjucks partials
        handlebars: gulpOptions.watchAppFolder ? ['./src/shortcode/**/*.handlebars', './src/shortcode/**/*.hbs', './src/app/**/*.handlebars', './src/app/**/*.hbs', '!./src/shortcode/**/_*.handlebars', '!./src/shortcode/**/_*.hbs', '!./src/app/**/_*.handlebars', '!./src/app/**/_*.hbs'] : ['./src/shortcode/**/*.handlebars', './src/shortcode/**/*.hbs', '!./src/shortcode/**/_*.handlebars', '!./src/shortcode/**/_*.hbs'],
        html: gulpOptions.watchAppFolder ? ['./src/shortcode/**/*.html', './src/app/**/*.html', '!./src/shortcode/**/_*.html', '!./src/app/**/_*.html'] : ['./src/shortcode/**/*.html', '!./src/shortcode/**/_*.html'],
        demo: gulpOptions.htmlTemplate == 'hb' ? ['./src/app/**/demo/**/*.html', '!./src/app/demo/**/*.html', '!./src/app/**/demo/**/_*.html'] : ['./src/app/**/demo/**/*.html', '!./src/app/demo/**/*.html', '!./src/app/**/demo/**/_*.html'],
        content: ['./src/shortcode/**/*.json', './src/app/**/*.variables.scss', '!./src/shortcode/**/_*.json', '!./src/app/**/_*.variables.scss'],    // html content json
        asset: [`${gulpOptions.server.root}**/*`, `!${gulpOptions.server.root}**/*.html`],
        js: './src/shortcode/shortcode.js',
        import: ['./node_modules', './src/app/'],    // babel import path
        scss: './src/shortcode/shortcode.scss'
    },
    buildFiles = {
        handlebars: ['./src/shortcode/**/*.handlebars', './src/shortcode/**/*.hbs', '!./src/shortcode/**/_*.handlebars', '!./src/shortcode/**/_*.hbs'],
        html: ['./src/shortcode/**/*.html', '!./src/shortcode/**/_*.html']
    },
    outputFiles = {
        fonts: watchFiles.serve + gulpOptions.outputFiles.fonts,
        img: watchFiles.serve + gulpOptions.outputFiles.img,
        babel: gulpOptions.outputFiles.babel,
        js: watchFiles.serve + gulpOptions.outputFiles.js,
        scss: watchFiles.serve + gulpOptions.outputFiles.scss,
        html: watchFiles.serve + gulpOptions.outputFiles.html
    },
    assetSource = gulpOptions.server.root.substr(0, gulpOptions.server.root.length - 1);

let contentPath = watchFiles.content,
    assetPath = watchFiles.asset,
    shortcodeWatch = gulpOptions.htmlTemplate === 'hb' ? watchFiles.content.concat(watchFiles.handlebars) : watchFiles.content.concat(watchFiles.html),
    contentData = {
        path: {
            fonts: outputFiles.fonts[outputFiles.fonts - 1] == '/' ? outputFiles.fonts.replace(watchFiles.serve, '/') : outputFiles.fonts.replace(watchFiles.serve, '/') + '/',
            img: outputFiles.img[outputFiles.img - 1] == '/' ? outputFiles.img.replace(watchFiles.serve, '/') : outputFiles.img.replace(watchFiles.serve, '/') + '/',
            js: outputFiles.js[outputFiles.js - 1] == '/' ? outputFiles.js.replace(watchFiles.serve, '/') : outputFiles.js.replace(watchFiles.serve, '/') + '/',
            babel: outputFiles.babel,
            css: outputFiles.scss[outputFiles.scss - 1] == '/' ? outputFiles.scss.replace(watchFiles.serve, '/') : outputFiles.scss.replace(watchFiles.serve, '/') + '/',
            html: outputFiles.html[outputFiles.html - 1] == '/' ? outputFiles.html.replace(watchFiles.serve, '/') : outputFiles.html.replace(watchFiles.serve, '/') + '/'
        },
        scssVal: {},
        demoCode: {
            js: {},
            scss: {}
        }
    },
    watchTasks = [
        'shortcode:asset:watch',
        'shortcode:content:watch'
    ],
    demoListUpdated = false,
    startWatch = false;

if (gulpOptions.watchAppFolder)
    shortcodeWatch = shortcodeWatch.concat([
        './src/app/**/*.scss',
        './src/app/**/*.js',
        '!./src/app/**/_*.scss',
        '!./src/app/**/_*.js'
    ]);

// shortcode build
gulp.task(
    'shortcode:build',
    ['shortcode:content:get', 'shortcode:asset:copy']
);

// shortcode clean
gulp.task(
    'shortcode:clean',
    () => del([`${watchFiles.serve}**/*`])
);

// shortcode watch
gulp.task('shortcode:watch', watchTasks);

// copy asset
gulp.task(
    'shortcode:asset:copy',
    () => gulp.src(assetPath, {base: assetSource}).pipe(gulp.dest(watchFiles.serve))
);

// asset watch
gulp.task('shortcode:asset:watch', () => {
    if (gulpOptions.gulpWatch) {
        return watch(watchFiles.asset, (event) => {
            assetPath = event.path;

            return gulp.start('shortcode:asset:copy');
        });
    } else {
        return gulp.watch(watchFiles.asset, (event) => {
            assetPath = event.path;
            
            return gulp.start('shortcode:asset:copy');
        });
    }
});

// get content json
gulp.task(
    'shortcode:content:get',
    () => gulp.src(contentPath)
        .pipe(each(function (content, file, callback) {
            let newContent = content,
                fileArr = file.path.search(/\\/) !== -1 ? file.path.split('\\') : file.path.split('\/'),
                isJson = fileArr[fileArr.length - 1].search('.json') !== -1,
                val = isJson ? fileArr[fileArr.length - 1].replace('.json', '') : fileArr[fileArr.length - 1].replace('.variables.scss', '');

            fs.readFile(file.path, 'utf8', function (err, data) {
                if (isJson)
                    contentData[val] = JSON.parse(data.toString('utf8').replace(/^\uFEFF/, ''));
                else
                    contentData.scssVal[val] = scss2json(data);

                callback(null, newContent);
            });

            // callback(null, newContent);
        })).on('end', () => {
            gulp.start('shortcode:demoList:build');
        })
);

// watch content
gulp.task('shortcode:content:watch', () => {
    startWatch = true;

    if (gulpOptions.gulpWatch) {
        return watch(shortcodeWatch, (event) => {
            return gulp.start('shortcode:content:get');
        });
    } else
        return gulp.watch(shortcodeWatch, ['shortcode:content:get']);
});

// build shortcode js, scss
gulp.task(
    'shortcode:source:build',
    (cd) => {
        let _getSource = function (_path) {
            let _source = {};

            if (fs.existsSync(_path)) {
                _source = fs.readFileSync(_path, 'utf8');

                return _source;
            }

            return false;
        };

        let _sourceData,
            _sourcePath,
            _jsCode = `// auto import demo js\n`,
            _scssCode = `// auto impot demo scss\n@import "./src/app/demo/demo.scss";\n@import "./src/app/prismjs/prismjs.scss";\n`,
            _taskList = ['shortcode:js:build', 'shortcode:scss:build'];

        contentData.shortcode.demo = {};

        if (typeof contentData.demoList === 'object') {
            for (let demoGroup in contentData.demoList) {
                contentData.shortcode.demo[demoGroup] = contentData.demoList[demoGroup].enable === true;
                if (contentData.demoList[demoGroup].enable === true && typeof contentData.demoList[demoGroup].demo === 'object') {
                    contentData.demoCode[demoGroup] = {};

                    for (let demo in contentData.demoList[demoGroup].demo) {
                        if (contentData.demoList[demoGroup].demo[demo].enable === true) {
                            contentData.demoCode[demoGroup][demo] = {};

                            // get js code
                            _sourcePath = `${demoGroup}/demo/${demo}`;
                            _sourceData = _getSource(`./src/app/${_sourcePath}.js`);

                            if (_sourceData !== false) {
                                _jsCode += `import '${_sourcePath}';\n`;
                                contentData.demoCode[demoGroup][demo].js = _sourceData;
                            }

                            // get scss code
                            _sourcePath = `./src/app/${demoGroup}/demo/${demo}.scss`;
                            _sourceData = _getSource(_sourcePath);

                            if (_sourceData !== false) {
                                _scssCode += `@import "${_sourcePath}";\n`;
                                contentData.demoCode[demoGroup][demo].scss = _sourceData;
                            }
                        }
                    }
                }
            }

            fs.writeFileSync(watchFiles.js, _jsCode);
            fs.writeFileSync(watchFiles.scss, _scssCode);

            if (gulpOptions.htmlTemplate == 'hb')
                _taskList.push('shortcode:hb:build');
            else
                _taskList.push('shortcode:nunjucks:build');
        }

        return gulpSequence(_taskList, cd);
    }
);

// hb build
gulp.task(
    'shortcode:hb:build',
    () => gulp.src(buildFiles.handlebars)
        .pipe(hb({
            partials: watchFiles.hb,
            data: contentData
        }).helpers(helpers))
        .pipe(highlight())
        .pipe(htmlbeautify(gulpOptions.htmlbeautify))
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace('\\demo', '').replace('\/demo', '');
            path.extname = '.html';
        }))
        .pipe(gulp.dest(outputFiles.html))
);

// nunjucks build
gulp.task(
    'shortcode:nunjucks:build',
    () => gulp.src(buildFiles.html)
        .pipe(nunjucksRender({
            path: watchFiles.nunjucks,
            data: contentData,
            manageEnv: manageEnvironment
        }))
        .pipe(highlight())
        .pipe(htmlbeautify(gulpOptions.htmlbeautify))
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace('\\demo', '').replace('\/demo', '');
        }))
        .pipe(gulp.dest(outputFiles.html))
);

// js build
gulp.task(
    'shortcode:js:build',
    () => gulp.src([watchFiles.js])
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

// scss build
gulp.task(
    'shortcode:scss:build',
    () => gulp.src(watchFiles.scss)
        .pipe(sourcemaps.init())    // sourcemaps
        .pipe(sass({importer: moduleImporter(), outputStyle: 'compressed'}).on('error', sass.logError))    // minify --> outputStyle: 'compressed'
        .pipe(sourcemaps.write('./'))    // sourcemaps
        .pipe(gulp.dest(outputFiles.scss))
);

// demoList build
gulp.task(
    'shortcode:demoList:build',
    () => {
        demoListUpdated = false;
        return gulp.src(watchFiles.demo)
            .pipe(each(function (content, file, callback) {
                let newContent = content,
                    fileArr = file.path.search(/\\/) !== -1 ? file.path.split('\\') : file.path.split('\/'),
                    demoId = fileArr[fileArr.indexOf('demo') - 1],
                    val = gulpOptions.htmlTemplate === 'hb' ? fileArr[fileArr.length - 1].replace('.hbs', '').replace('.handlebars', '') : fileArr[fileArr.length - 1].replace('.html', '');

                if (typeof contentData.demoList[demoId] === 'undefined') {
                    demoListUpdated = true;

                    contentData.demoList[demoId] = {
                        enable: false,
                        title: demoId,
                        description: '',
                        demo: {}
                    };
                }

                if (typeof contentData.demoList[demoId].demo[val] === 'undefined') {
                    demoListUpdated = true;

                    contentData.demoList[demoId].demo[val] = {
                        enable: false,
                        title: val,
                        description: '',
                        table: {}
                    };
                }

                callback(null, newContent);
            })).on('end', () => {
                if (demoListUpdated === true) {
                    fs.writeFileSync('./src/shortcode/demoList.json', JSON.stringify(contentData.demoList, null, 2));
                    if (startWatch !== true)
                        gulp.start('shortcode:content:get');
                } else
                    gulp.start('shortcode:source:build');
            })
    }
);
