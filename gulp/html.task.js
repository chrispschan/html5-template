import fs from 'fs';
import gulp from 'gulp';
import each from 'gulp-each';
import rename from 'gulp-rename';
import htmlbeautify from 'gulp-html-beautify';
import hb from 'gulp-hb';
import nunjucksRender from 'gulp-nunjucks-render';

import helpers from './../src/helpers.js';    // handlebars helpers
import manageEnvironment from './../src/manageEnvironment.js';    // nunjucks environment

import gulpOptions from './../gulp.options.js';

const watchFiles = {
    serve: gulpOptions.server.root,
    hb: './src/app/**/*.{hbs,handlebars}',    // handlebars partials
    nunjucks: ['./src/app/'],    // nunjucks partials
    handlebars: ['./src/html/**/*.handlebars', './src/html/**/*.hbs', '!./src/html/**/_*.handlebars', '!./src/html/**/_*.hbs'],
    html: ['./src/html/**/*.html', '!./src/html/**/_*.html'],
    content: ['./src/data/**/*.json', '!./src/data/**/_*.json']    // html content json
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
        babel:outputFiles.babel,
        css: outputFiles.scss[outputFiles.scss - 1] == '/' ? outputFiles.scss.replace(watchFiles.serve, '/') : outputFiles.scss.replace(watchFiles.serve, '/') + '/',
        html: outputFiles.html[outputFiles.html - 1] == '/' ? outputFiles.html.replace(watchFiles.serve, '/') : outputFiles.html.replace(watchFiles.serve, '/') + '/'
    }
};

// hb build
gulp.task(
    'hb:build',
    () => gulp.src(watchFiles.handlebars)
        .pipe(hb({
            partials: watchFiles.hb,
            data: contentData
        }).helpers(helpers))
        .pipe(htmlbeautify(gulpOptions.htmlbeautify))
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
        .pipe(htmlbeautify(gulpOptions.htmlbeautify))
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
            if (gulpOptions.htmlTemplate == 'hb') gulp.start('hb:build');
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