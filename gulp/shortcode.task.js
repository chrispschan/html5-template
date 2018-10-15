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

import helpers from './../src/helpers.js';    // handlebars helpers
import manageEnvironment from './../src/manageEnvironment.js';    // nunjucks environment

import gulpOptions from './../gulp.options.js';

import {scss2json} from './json.function.js';

const watchFiles = {
        serve: './shortcode/',
        hb: './src/app/**/*.{hbs,handlebars}',    // handlebars partials
        nunjucks: ['./src/app/'],    // nunjucks partials
        handlebars: gulpOptions.watchAppFolder ? ['./src/shortcode/**/*.handlebars', './src/shortcode/**/*.hbs', './src/app/**/*.handlebars', './src/app/**/*.hbs', '!./src/shortcode/**/_*.handlebars', '!./src/shortcode/**/_*.hbs', '!./src/app/**/_*.handlebars', '!./src/app/**/_*.hbs', '!./src/app/**/demo/**/_*.handlebars', '!./src/app/**/demo/**/_*.hbs', './src/app/demo/**/_*.handlebars', './src/app/demo/**/_*.hbs'] : ['./src/shortcode/**/*.handlebars', './src/shortcode/**/*.hbs', '!./src/shortcode/**/_*.handlebars', '!./src/shortcode/**/_*.hbs'],
        html: gulpOptions.watchAppFolder ? ['./src/shortcode/**/*.html', './src/app/**/*.html', '!./src/shortcode/**/_*.html', '!./src/app/**/_*.html', '!./src/app/**/demo/**/*.html', './src/app/demo/**/*.html'] : ['./src/shortcode/**/*.html', '!./src/shortcode/**/_*.html'],
        content: ['./src/shortcode/**/*.json', '!./src/shortcode/**/_*.json'],    // html content json
        scssVal: ['./src/app/**/*.variables.scss', '!./src/app/**/_*.variables.scss'],
        demo: gulpOptions.htmlTemplate == 'hb' ? ['./src/app/**/demo/**/*.html', '!./src/app/demo/**/*.html', '!./src/app/**/demo/**/_*.html'] : ['./src/app/**/demo/**/*.html', '!./src/app/demo/**/*.html', '!./src/app/**/demo/**/_*.html'],
        asset: [`${gulpOptions.server.root}**/*`, `!${gulpOptions.server.root}**/*.html`],
        js: './src/shortcode/shortcode.js',
        import: ['./node_modules', './src/app/'],    // babel import path
        scss: './src/shortcode/shortcode.scss',
        demoJs: ['./src/app/**/demo/**/*.js', '!./src/app/demo/**/*.js', '!./src/app/**/demo/**/_*.js'],
        demoScss: ['./src/app/**/demo/**/*.scss', '!./src/app/demo/**/*.js', '!./src/app/**/demo/**/_*.scss']
    },
    buildFiles = {
        handlebars: ['./src/app/**/demo/**/*.handlebars', './src/app/**/demo/**/*.hbs', './src/shortcode/**/*.handlebars', './src/shortcode/**/*.hbs', '!./src/app/demo/**/*.handlebars', '!./src/app/demo/**/*.hbs', '!./src/app/**/demo/**/_*.handlebars', '!./src/app/**/demo/**/_*.hbs', '!./src/shortcode/**/_*.handlebars', '!./src/shortcode/**/_*.hbs'],
        html: ['./src/app/**/demo/**/*.html', './src/shortcode/**/*.html', '!./src/app/demo/**/*.html', '!./src/app/**/demo/**/_*.html', '!./src/shortcode/**/_*.html']
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
    scssPath = watchFiles.scssVal,
    assetPath = watchFiles.asset,
    contentData = {
        path: {
            fonts: outputFiles.fonts[outputFiles.fonts - 1] == '/' ? outputFiles.fonts.replace(watchFiles.serve, '/') : outputFiles.fonts.replace(watchFiles.serve, '/') + '/',
            img: outputFiles.img[outputFiles.img - 1] == '/' ? outputFiles.img.replace(watchFiles.serve, '/') : outputFiles.img.replace(watchFiles.serve, '/') + '/',
            js: outputFiles.js[outputFiles.js - 1] == '/' ? outputFiles.js.replace(watchFiles.serve, '/') : outputFiles.js.replace(watchFiles.serve, '/') + '/',
            babel: outputFiles.babel,
            css: outputFiles.scss[outputFiles.scss - 1] == '/' ? outputFiles.scss.replace(watchFiles.serve, '/') : outputFiles.scss.replace(watchFiles.serve, '/') + '/',
            html: outputFiles.html[outputFiles.html - 1] == '/' ? outputFiles.html.replace(watchFiles.serve, '/') : outputFiles.html.replace(watchFiles.serve, '/') + '/'
        },
        demo: {
            js: {},
            scss: {}
        }
    },
    watchTasks = [
        'shortcode:asset:watch',
        'shortcode:demo:watch',
        'shortcode:content:watch',
        'shortcode:scssVal:watch',
        'shortcode:scss:watch',
        'shortcode:js:watch'
    ];

if (gulpOptions.htmlTemplate == 'hb')
    watchTasks.push('shortcode:hb:watch');
else
    watchTasks.push('shortcode:nunjucks:watch');

// shortcode build
gulp.task(
    'shortcode:build',
    ['shortcode:content:build', 'shortcode:asset:copy'],
    () => gulp.start(['shortcode:scssVal:get'])
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

// hb watch
gulp.task('shortcode:hb:watch', () => {
    if (gulpOptions.gulpWatch) {
        return watch(watchFiles.handlebars, () => {
            return gulp.start('shortcode:hb:build');
        });
    } else
        return gulp.watch(watchFiles.handlebars, ['shortcode:hb:build']);
});

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

// nunjucks watch
gulp.task('shortcode:nunjucks:watch', () => {
    if (gulpOptions.gulpWatch) {
        return watch(watchFiles.html, () => {
            return gulp.start('shortcode:nunjucks:build');
        });
    } else
        return gulp.watch(watchFiles.html, ['shortcode:nunjucks:build']);
});

// demo watch
gulp.task('shortcode:demo:watch', () => {
    if (gulpOptions.gulpWatch) {
        return watch(watchFiles.demo, () => {
            return gulp.start('shortcode:content:build');
        });
    } else
        return gulp.watch(watchFiles.demo, ['shortcode:content:build']);
});

// build content json
gulp.task(
    'shortcode:content:build',
    () => {
        let _path = './src/shortcode/demoList.json',
            _shortcode = './src/shortcode/shortcode.json',
            _content = {},
            _shortcodeDemo = {};
        
        if (!fs.existsSync(_path)) {
            fs.writeFile(_path, '{}', function (err) {
                if (err)
                    return console.log(err);
            });
        }

        fs.readFile(_path, 'utf8', (err, data) => {
            if (err)
                return console.log(err);

            if (typeof data === 'string') {
                if (data[0] !== '{' && data[0] !== '[' && data[0] !== '"') data = data.substr(1);
                _content = JSON.parse(data);
            } else
                _content = data;
        });

        if (fs.existsSync(_shortcode)) {
            fs.readFile(_shortcode, 'utf8', (err, data) => {
                if (err)
                    return console.log(err);

                if (typeof data === 'string') {
                    if (data[0] !== '{' && data[0] !== '[' && data[0] !== '"') data = data.substr(1);
                    _shortcodeDemo = JSON.parse(data);
                } else
                    _shortcodeDemo = data;
            });
        }

        return gulp.src(watchFiles.demo)
            .pipe(each(function (content, file, callback) {
                let newContent = content,
                    fileArr = file.path.split('\\'),
                    demoId = fileArr[fileArr.indexOf('demo') - 1],
                    val = fileArr[fileArr.length - 1].replace('.html', '');

                if (typeof _content[demoId] === 'undefined') {
                    _content[demoId] = {
                        title: demoId,
                        description: '',
                        demo: {}
                    };
                }

                if (typeof _content[demoId].demo[val] === 'undefined') {
                    _content[demoId].demo[val] = {
                        enable: false,
                        title: val,
                        description: '',
                        table: {}
                    };
                }

                if (typeof _shortcodeDemo.demo[demoId] === 'undefined')
                    _shortcodeDemo.demo[demoId] = false;

                callback(null, newContent);
            })).on('end', () => {
                let _jsContent = '// auto import demo js\n',
                    _scssContent = `// auto impot demo scss\n@import "./src/app/demo/demo.scss";\n@import "./src/app/prismjs/prismjs.scss";\n`;

                fs.writeFile(_path, JSON.stringify(_content, null, 2), function (err) {
                    if (err)
                        return console.log(err);
                });

                if (fs.existsSync(_shortcode)) {
                    fs.writeFile(_shortcode, JSON.stringify(_shortcodeDemo, null, 2), function (err) {
                        if (err)
                            return console.log(err);
                    });
                }

                for (let key in _content) {
                    if (_shortcodeDemo.demo[key] === true && typeof _content[key] !== 'undefined') {
                        for (let demoKey in _content[key].demo) {
                            if (_content[key].demo[demoKey].enable === true) {

                                if (typeof contentData.demo[key] === 'undefined')
                                    contentData.demo[key] = {};

                                if (typeof contentData.demo[key][demoKey] === 'undefined')
                                    contentData.demo[key][demoKey] = {};

                                if (fs.existsSync(`./src/app/${key}/demo/${demoKey}.js`)) {
                                    _jsContent += `import \'${key}/demo/${demoKey}\';\n`;
                                    fs.readFile(`./src/app/${key}/demo/${demoKey}.js`, 'utf8', (err, data) => {
                                        if (err)
                                            return console.log(err);

                                        if (typeof data === 'string')
                                            contentData.demo[key][demoKey].js = data;
                                    });
                                }

                                if (fs.existsSync(`./src/app/${key}/demo/${demoKey}.scss`)) {
                                    _scssContent += `@import \"./src/app/${key}/demo/${demoKey}.scss\";\n`;
                                    fs.readFile(`./src/app/${key}/demo/${demoKey}.scss`, 'utf8', (err, data) => {
                                        if (err)
                                            return console.log(err);

                                        if (typeof data === 'string')
                                            contentData.demo[key][demoKey].scss = data;
                                    });
                                }
                            }
                        }
                    }
                }

                fs.writeFile(watchFiles.js, _jsContent, function (err) {
                    if (err)
                        return console.log(err);
                });

                fs.writeFile(watchFiles.scss, _scssContent, function (err) {
                    if (err)
                        return console.log(err);
                });

                contentPath = watchFiles.content;

                gulp.start(['shortcode:content:get', 'shortcode:js:build', 'shortcode:scss:build']);
            });
    }
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

// js watch
gulp.task('shortcode:js:watch', () => {
    if (gulpOptions.gulpWatch) {
        return watch(watchFiles.demoJs, () => {
            return gulp.start('shortcode:js:build');
        });
    } else
        return gulp.watch(watchFiles.demoJs, ['shortcode:js:build']);
});

// scss build
gulp.task(
    'shortcode:scss:build',
    () => gulp.src(watchFiles.scss)
        .pipe(sourcemaps.init())    // sourcemaps
        .pipe(sass({importer: moduleImporter(), outputStyle: 'compressed'}).on('error', sass.logError))    // minify --> outputStyle: 'compressed'
        .pipe(sourcemaps.write('./'))    // sourcemaps
        .pipe(gulp.dest(outputFiles.scss))
);

// scss watch
gulp.task('shortcode:scss:watch', () => {
    if (gulpOptions.gulpWatch) {
        return watch(watchFiles.demoScss, () => {
            return gulp.start('shortcode:scss:build');
        });
    } else
        return gulp.watch(watchFiles.demoScss, ['shortcode:scss:build']);
});

// get content json
gulp.task(
    'shortcode:content:get',
    () => gulp.src(contentPath)
        .pipe(each(function (content, file, callback) {
            let newContent = content,
                fileArr = file.path.split('\\'),
                val = fileArr[fileArr.length - 1].replace('.json', '');

            fs.readFile(file.path, 'utf8', function (err, data) {
                contentData[val] = JSON.parse(data.toString('utf8').replace(/^\uFEFF/, ''));
                callback(null, newContent);
            });

            // callback(null, newContent);
        })).on('end', () => {
            let _dir = '',
                _content = '',
                _newScss = typeof contentData.scssVal === 'undefined',
                _buildScss = function (key) {
                    if (!fs.existsSync(`${_dir}/${key}.scss`)) {
                        if (fs.existsSync(`${_dir}/${key}.function.scss`))
                            _content += `@import "${_dir}/${key}.function.scss";\n`;
                        if (fs.existsSync(`${_dir}/${key}.mixin.scss`))
                            _content += `@import "${_dir}/${key}.mixin.scss";\n`;
                        if (fs.existsSync(`${_dir}/${key}.variables.scss`))
                            _content += `@import "${_dir}/${key}.variables.scss";\n`;

                        if (_content !== '') {
                            _newScss = true;

                            fs.writeFile(`${_dir}/${key}.scss`, _content, function (err) {
                                if (err)
                                    return console.log(err);
                            });
                        }
                    }
                };

            for (let key in contentData.demoList) {
                _dir = `./src/app/${key}`;

                if (fs.existsSync(`${_dir}/${key}.default.scss`) && !fs.existsSync(`${_dir}/${key}.variables.scss`)) {
                    fs.copyFile(`${_dir}/${key}.default.scss`, `${_dir}/${key}.variables.scss`, function (err) {
                        if (err)
                            return console.log(err);

                        _buildScss(key);
                    });
                } else
                    _buildScss(key);
            }

            if (_newScss && !gulpOptions.gulpWatch) {
                scssPath = watchFiles.scssVal;

                gulp.start('shortcode:scssVal:get');
            } else if (!_newScss) {
                if (gulpOptions.htmlTemplate == 'hb') gulp.start('shortcode:hb:build');
                else gulp.start('shortcode:nunjucks:build');
            }
        })
);

// content json watch
gulp.task('shortcode:content:watch',
    () => {
        if (gulpOptions.gulpWatch) {
            return watch(watchFiles.content, (event) => {
                contentPath = event.path;

                return gulp.start('shortcode:content:get');
            });
        } else {
            return gulp.watch(watchFiles.content, (event) => {
                contentPath = event.path;

                return gulp.start('shortcode:content:get');
            });
        }
    });

// get scss variables json
gulp.task(
    'shortcode:scssVal:get',
    () => gulp.src(scssPath)
        .pipe(each(function (content, file, callback) {
            let newContent = content,
                fileArr = file.path.split('\\'),
                val = fileArr[fileArr.length - 1].replace('.variables.scss', '');

            fs.readFile(file.path, 'utf8', function (err, data) {
                if (!contentData.scssVal) contentData.scssVal = {};
                contentData.scssVal[val] = scss2json(data);
                callback(null, newContent);
            });

            // callback(null, newContent);
        })).on('end', () => {
            if (gulpOptions.htmlTemplate == 'hb') gulp.start('shortcode:hb:build');
            else gulp.start('shortcode:nunjucks:build');
        })
);

// scss variables json watch
gulp.task('shortcode:scssVal:watch',
    () => {
        if (gulpOptions.gulpWatch) {
            return watch(watchFiles.scssVal, (event) => {
                scssPath = event.path;

                return gulp.start('shortcode:scssVal:get');
            });
        } else {
            return gulp.watch(watchFiles.scssVal, (event) => {
                scssPath = event.path;

                return gulp.start('shortcode:scssVal:get');
            });
        }
    });
