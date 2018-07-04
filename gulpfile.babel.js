import fs from 'fs';
import del from 'del';
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import each from 'gulp-each';
import rename from 'gulp-rename';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import moduleImporter from 'sass-module-importer';
import favicons from 'gulp-favicons';
import browserSync from 'browser-sync';
import ssi from 'connect-ssi';
import htmlbeautify from 'gulp-html-beautify';
import hb from 'gulp-hb';
import nunjucksRender from 'gulp-nunjucks-render';
import directoryMap from 'gulp-directory-map';

import stylelint from 'stylelint';
import postcss from 'gulp-postcss';
import reporter from 'postcss-reporter';
import syntaxScss from 'postcss-scss';
import eslint from 'gulp-eslint';

import accessibility from 'gulp-accessibility';

import stylelintConfig from './src/stylelint.config.js';
import helpers from './src/helpers.js';    // handlebars helpers
import manageEnvironment from './src/manageEnvironment.js';    // nunjucks environment
import eslintConfig from './src/eslint.config.js';

import gulpOptions from './gulp.options.js';
import gulpApi from './gulp.api.js';

const serve = browserSync.create(),
cmsServe = browserSync.create(),
product = {
    watchFiles: {    // gulp watch files
        serve: gulpOptions.server.root,
        cmsServe: {
            root: './cms/',
            temp: 'cms/temp/',
            output: 'src/data/',
            folderMenu: 'folderMenu.json'
        },
        fonts: ['./src/fonts/**/*', '!./src/fonts/**/_*'],
        img: ['./src/img/**/*', '!./src/img/**/_*', '!./src/img/_**/*'],
        favicon: './src/favicon.png',
        import: ['./node_modules','./src/app/'],    // babel import path
        js: ['./src/js/**/*.js', '!./src/js/**/_*.js'],
        jsLint: ['./src/app/**/*.js', './src/js/**/*.js', '!./src/app/**/_*.js', '!./src/js/**/_*.js'],
        scss: ['./src/css/**/*.scss', '!./src/css/**/_*.scss'],
        hb: './src/app/**/*.{hbs,handlebars}',    // handlebars partials
        nunjucks: ['./src/app/'],    // nunjucks partials
        handlebars: ['./src/html/**/*.handlebars', './src/html/**/*.hbs', '!./src/html/**/_*.handlebars', '!./src/html/**/_*.hbs'],
        html: ['./src/html/**/*.html', '!./src/html/**/_*.html'],
        content: ['./src/data/**/*.json', '!./src/data/**/_*.json']    // html content json
    }, 
    outputFiles: gulpOptions.outputFiles
}, 
demo = {
    watchFiles: {    // gulp watch files
        serve: './demo/', // server root folder
        img: ['./src/demo/**/img/**/*', '!./src/demo/**/img/**/_*'],
        favicon: './src/favicon.png',
        import: ['./node_modules','./src/app/'],    // babel import path
        js: ['./src/demo/**/*.js', '!./src/demo/**/_*.js'],
        jsLint: ['./src/app/**/*.js', './src/demo/**/*.js', '!./src/app/**/_*.js', '!./src/demo/**/_*.js'],
        scss: ['./src/demo/**/*.scss', '!./src/demo/**/_*.scss'],
        hb: './src/app/**/*.{hbs,handlebars}',    // handlebars partials
        nunjucks: ['./src/app/'],    // nunjucks partials
        handlebars: ['./src/demo/**/*.handlebars', './src/demo/**/*.hbs', '!./src/demo/**/_*.handlebars', '!./src/demo/**/_*.hbs'],
        html: ['./src/demo/**/*.html', '!./src/demo/**/_*.html'],
        content: ['./src/demo/**/*.json', '!./src/demo/**/_*.json']    // html content json
    },
    outputFiles: {
        img: '',
        babel: '',
        js: '',
        scss: '',
        html: ''
    }
};

// check is string a json format
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

let watchFiles = Object.assign({}, product.watchFiles), 
outputFiles = {
    fonts: watchFiles.serve + product.outputFiles.fonts,
    img: watchFiles.serve + product.outputFiles.img,
    babel: product.outputFiles.babel,
    js: watchFiles.serve + product.outputFiles.js,
    scss: watchFiles.serve + product.outputFiles.scss,
    html: watchFiles.serve + product.outputFiles.html
},
options = {
    serve: {
        server: watchFiles.serve,
        port: gulpOptions.server.port,
        baseDir: watchFiles.serve
    },
    cmsServe: {
        server: watchFiles.cmsServe.root,
        port: gulpOptions.cmsServer.port,
        baseDir: watchFiles.cmsServe.root,
        open: false,
        ui: {
            port: 3002
        },
        middleware: [
            ssi({
                baseDir: watchFiles.cmsServe.root,
                ext: '.html'
            }),
            {
                route: '/api/getFolderStructure',
                handle: (req, res, next) => {
                    gulp.src(watchFiles.content)
                        .pipe(directoryMap({
                            filename: watchFiles.cmsServe.folderMenu
                        }))
                        .pipe(gulp.dest(watchFiles.cmsServe.root)).on('end', () => {
                            fs.readFile(`${watchFiles.cmsServe.root.replace('./', '')}${watchFiles.cmsServe.folderMenu}`, 'utf8', (err, data) => {
                                if (err) {
                                    res.end(JSON.stringify({}));

                                    return console.log(err);
                                }
                                if (isJson(data)) {
                                    res.end(JSON.stringify(JSON.parse(data)));
                                } else {
                                    res.end(JSON.stringify({}));
                                }
                            });
                        });
                }
            },
            {
                route: '/api/getJson',
                handle: (req, res, next) => {
                    let _data = '';
                    let _path = '';

                    req.on('data', function(chunk) {
                        _data += chunk.toString();
                        if (isJson(_data)) {
                            _data = JSON.parse(_data);
                            if (_data.temp === true) {
                                _path = watchFiles.cmsServe.temp + _data.path;
                            } else {
                                _path = watchFiles.cmsServe.output + _data.path;
                            }

                            fs.stat(_path, function(err, stat) {
                                if(err == null) {
                                    _path = _path;
                                } else if(err.code == 'ENOENT') {
                                    if (_data.temp === true) _path = watchFiles.cmsServe.output + _data.path;
                                    else _path = ''
                                } else {
                                    if (_data.temp === true) _path = watchFiles.cmsServe.output + _data.path;
                                    else _path = ''
                                }

                                if (_path !== '') {
                                    fs.readFile(_path, 'utf8', (err, data) => {
                                        let _json = data;
                                        if (err) {
                                            res.end(JSON.stringify({}));

                                            return console.log(err);
                                        }

                                        if (_json[0] !== '{' && _json[0] !== '[' && _json[0] !== '"') _json = _json.substr(1);
                                        res.end(JSON.stringify(JSON.parse(_json)));
                                    });
                                } else {
                                    res.end(JSON.stringify({}));
                                }
                            });
                        }
                    });
                }
            },
            {
                route: '/api/saveJson',
                handle: (req, res, next) => {
                    let _data = '';
                    let _path = '';
                    req.on('data', function(chunk) {
                        _data += chunk.toString();
                        if (isJson(_data)) {
                            _data = JSON.parse(_data);
                            if (_data.temp === true) {
                                _path = watchFiles.cmsServe.temp + _data.path;
                            } else {
                                _path = watchFiles.cmsServe.output + _data.path;
                            }

                            if (typeof _data.path !== 'undefined' && typeof _data.json !== 'undefined') {
                                fs.writeFile(_path, JSON.stringify(_data.json, null, 2), function(err) {
                                    if(err) {
                                        res.end(JSON.stringify({}));
                                        // text = err;
                                        return console.log(err);
                                    }

                                    res.end(JSON.stringify({}));
                                });
                            } else {
                                res.end(JSON.stringify({}));
                            }
                        }
                    });
                }
            }
        ]
    },
    favicon: gulpOptions.favicon,
    htmlbeautify: gulpOptions.htmlbeautify,
    accessibility: gulpOptions.accessibility
},
contentPath = watchFiles.content,
contentData = {
    path: {
        fonts: outputFiles.fonts[outputFiles.fonts - 1] == '/' ? outputFiles.fonts.replace(watchFiles.serve, '/') : outputFiles.fonts.replace(watchFiles.serve, '/') + '/',
        img: outputFiles.img[outputFiles.img - 1] == '/' ? outputFiles.img.replace(watchFiles.serve, '/') : outputFiles.img.replace(watchFiles.serve, '/') + '/',
        js: outputFiles.js[outputFiles.js - 1] == '/' ? outputFiles.js.replace(watchFiles.serve, '/') : outputFiles.js.replace(watchFiles.serve, '/') + '/',
        babel:outputFiles.babel,
        css: outputFiles.scss[outputFiles.scss - 1] == '/' ? outputFiles.scss.replace(watchFiles.serve, '/') : outputFiles.scss.replace(watchFiles.serve, '/') + '/',
        html: outputFiles.html[outputFiles.html - 1] == '/' ? outputFiles.html.replace(watchFiles.serve, '/') : outputFiles.html.replace(watchFiles.serve, '/') + '/'
    }
},
htmlTemplate = gulpOptions.htmlTemplate,
defaultTasks = gulpOptions.defaultTasks;

gulpApi.push(ssi({
    baseDir: watchFiles.serve == './' ? __dirname : __dirname + watchFiles.serve.replace('./', '/'),
    ext: '.html'
}));

options.serve.middleware = gulpApi;
 
gulp.task('default', () => {
    if (htmlTemplate == 'hb') defaultTasks.push('hb:watch');
    else defaultTasks.push('nunjucks:watch');

    gulp.start(defaultTasks, ['cmsServer:setup', 'server:setup']);
});

// use handlebars develop
gulp.task('hb:dev', () => {
    htmlTemplate = 'hb';

    defaultTasks.push('hb:watch');

    gulp.start(defaultTasks, ['server:setup']);
});

// use nunjucks develop
gulp.task('nunjucks:dev', () => {
    htmlTemplate = 'nunjucks';

    defaultTasks.push('nunjucks:watch');

    gulp.start(defaultTasks, ['server:setup']);
});

// demo develop
gulp.task('demo', () => {
    watchFiles = Object.assign(watchFiles, demo.watchFiles);
    outputFiles = {
        fonts: watchFiles.serve + demo.outputFiles.fonts,
        img: watchFiles.serve + demo.outputFiles.img,
        babel: demo.outputFiles.babel,
        js: watchFiles.serve + demo.outputFiles.js,
        scss: watchFiles.serve + demo.outputFiles.scss,
        html: watchFiles.serve + demo.outputFiles.html
    };
    options.serve.server = watchFiles.serve;
    options.serve.baseDir = watchFiles.serve;
    options.serve.middleware = [
        ssi({
                baseDir: watchFiles.serve == './' ? __dirname : __dirname + watchFiles.serve.replace('./', '/'),
                ext: '.html'
            })
    ];
    contentPath = watchFiles.content;
    contentData = {
        path: {
            fonts: outputFiles.fonts[outputFiles.fonts - 1] == '/' ? outputFiles.fonts.replace(watchFiles.serve, '/') : outputFiles.fonts.replace(watchFiles.serve, '/') + '/',
            img: outputFiles.img[outputFiles.img - 1] == '/' ? outputFiles.img.replace(watchFiles.serve, '/') : outputFiles.img.replace(watchFiles.serve, '/') + '/',
            js: outputFiles.js[outputFiles.js - 1] == '/' ? outputFiles.js.replace(watchFiles.serve, '/') : outputFiles.js.replace(watchFiles.serve, '/') + '/',
            babel:outputFiles.babel,
            css: outputFiles.scss[outputFiles.scss - 1] == '/' ? outputFiles.scss.replace(watchFiles.serve, '/') : outputFiles.scss.replace(watchFiles.serve, '/') + '/',
            html: outputFiles.html[outputFiles.html - 1] == '/' ? outputFiles.html.replace(watchFiles.serve, '/') : outputFiles.html.replace(watchFiles.serve, '/') + '/'
        }
    };

    if (htmlTemplate == 'hb') defaultTasks.push('hb:watch');
    else defaultTasks.push('nunjucks:watch');

    gulp.start(defaultTasks);
});

// local server setup
gulp.task('server:setup', () => serve.init(options.serve));

// cms server setup
gulp.task('cmsServer:setup', () => {
    del([`./${watchFiles.cmsServe.temp}**/*.json`]);
    return cmsServe.init(options.cmsServe);
});

// font copy
gulp.task('fonts:copy', () => gulp.src(watchFiles.fonts).pipe(gulp.dest(outputFiles.fonts)));

// image copy
gulp.task('img:copy', () => gulp.src(watchFiles.img).pipe(gulp.dest(outputFiles.img)));

// favicon build
gulp.task(
    'favicon:build', 
    () => gulp.src(watchFiles.favicon)
        .pipe(favicons(options.favicon))
        .pipe(gulp.dest(watchFiles.serve))
);

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

// scss build
gulp.task(
    'scss:build', 
    () =>    {
        let processors = [
                stylelint(stylelintConfig),
                reporter({
                        clearMessages: true,
                        throwError: true
                })
            ];

        return gulp.src(watchFiles.scss)
            .pipe(postcss(processors, {syntax: syntaxScss}))
            .pipe(sourcemaps.init())    // sourcemaps
            .pipe(sass({importer: moduleImporter(), outputStyle: 'compressed'}).on('error', sass.logError))    // minify --> outputStyle: 'compressed'
            .pipe(sourcemaps.write('./'))    // sourcemaps
            .pipe(gulp.dest(outputFiles.scss));
    }
);

// scss watch
gulp.task('scss:watch', () => gulp.watch(watchFiles.scss, ['scss:build']));

// hb build
gulp.task(
    'hb:build',
    () => gulp.src(watchFiles.handlebars)
        .pipe(hb({
            partials: watchFiles.hb,
            data: contentData
        }).helpers(helpers))
        .pipe(htmlbeautify(options.htmlbeautify))
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest(outputFiles.html))
);

// hb watch
gulp.task('hb:watch', () => gulp.watch(watchFiles.handlebars, ['hb:build']));

// nunjucks build
gulp.task(
    'nunjucks:build',
    () => gulp.src(watchFiles.html)
        .pipe(nunjucksRender({
            path: watchFiles.nunjucks,
            data: contentData,
            manageEnv: manageEnvironment
        }))
        .pipe(htmlbeautify(options.htmlbeautify))
        .pipe(gulp.dest(outputFiles.html))
);

// nunjucks watch
gulp.task('nunjucks:watch', () => gulp.watch(watchFiles.html, ['nunjucks:build']));

// get content json
gulp.task(
    'content:get', 
    () => gulp.src(contentPath)
        .pipe(each(function(content, file, callback) {
            let newContent = '// my comment\n' + content,
                fileArr = file.path.split('\\'),
                val = fileArr[fileArr.length - 1].replace('.json', '');

            fs.readFile(file.path, 'utf8', function(err, data){
                contentData[val] = JSON.parse(data.toString('utf8').replace(/^\uFEFF/, ''));
                callback(null, newContent);
            });

            // callback(null, newContent);
        })).on('end', () => {
            // console.log(contentData);
            if (htmlTemplate == 'hb') gulp.start('hb:build');
            else gulp.start('nunjucks:build');
        })
);

// content json watch
gulp.task('content:watch',
() => {
    gulp.watch(watchFiles.content, (event) => {
        contentPath = event.path;

        gulp.start('content:get');
    });
});

// WCAG check
gulp.task('wcag:check', () => {
    let _checkFiles = outputFiles.html;

    _checkFiles += _checkFiles[_checkFiles.length - 1] == '/' ? '**/*.html' : '/**/*.html';

    return gulp.src(_checkFiles)
        .pipe(accessibility(options.accessibility))
        .on('error', console.log)
        .pipe(accessibility.report({reportType: 'txt'}))
        .pipe(rename({
            extname: '.txt'
        }))
        .pipe(gulp.dest('reports/wcag'));
});
