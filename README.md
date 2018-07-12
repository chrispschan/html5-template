# HTML5 Template
Use Gulp.js to build HTML5 project with modules.

## Getting Started

### Development tools
- [Babel](https://babeljs.io/)
- [Handlebars](http://handlebarsjs.com/)
- [Nunjucks](https://mozilla.github.io/nunjucks/)
- [SCSS](http://sass-lang.com/)

### Install node package
Run command line:
```cmd
npm install
```

### Start Develop
Run command line:
```cmd
gulp
```

### WCAG Checking
Check all html output files by gulp-accessibility and output the report to ./reports/wcag/<br/>
Run command line:
```cmd
gulp wcag:check
```

### Options
Edit gulp.options.js to change Gulp.js tasks options.

#### gulpOptions.server
Setup localhost server options
- root: string (default: `'./app/'`) - server root folder
- port: string (default: `'30000'`) - server port

#### gulpOptions.cmsServer
Setup CMS localhost server options
- port: string (default: `'30001'`) - server port

#### gulpOptions.outputFiles
Build folder structure options. The folder structure will under `gulpOptions.server.root`.
- fonts: string (default: `'fonts'`) - fonts files output location
- img: string (default: `'images'`) - images files output location
- js: string (default: `'js'`) - javascript files output location
- babel: string (default: `'babel.js'`) - all html files pre-load javascript file name if use handlebars / nunjucks template build up html. Set `''` if not need pre-load.
- scss: string (default: `'styles'`) - css files output location
- html: string (default: `''`) - html files output location

#### gulpOptions.favicon
[gulp-favicons](https://www.npmjs.com/package/gulp-favicons) options.<br/>
See the [Favicons](https://github.com/evilebottnawi/favicons) README for more information.<br/>
Default:
```js
icons: {
    android: false,
    appleIcon: false,
    appleStartup: false,
    favicons: true,
    firefox: false,
    windows: true,
    yandex: false
},
pipeHTML: false
```

#### gulpOptions.es5
Is ES5 coding?<br/>
If use ES5, will use [gulp-include](https://www.npmjs.com/package/gulp-include) to make inclusion of files a breeze. Please make sure all include files is ES5 coding.<br/>
Default: `false`

#### gulpOptions.htmlTemplate
Ues whilch tool to build html files.<br/>
Vaule: `'hb' | 'nunjucks'`<br/>
Default: `'hb'`

#### gulpOptions.htmlbeautify
[gulp-html-beautify](https://www.npmjs.com/package/gulp-html-beautify) options.

#### gulpOptions.accessibility
[gulp-accessibility](https://www.npmjs.com/package/gulp-accessibility) options.<br/>
View [AccessSniff](https://github.com/yargalot/AccessSniff) options for all available options.<br/>
Default:
```js
accessibilityLevel: 'WCAG2AA',
force: true,
reportLevels: {
    notice: false,
    warning: true,
    error: true
}
```

#### gulpOptions.defaultTasks
Tasks inculde Gulp.js default task.<br/>
Default:
```js
'fonts:copy',   // copy fonts files to output location
'img:copy', // copy images files to output location
'favicon:build',    // build favicon to root location
'js:build', // check with ./src/eslint.config.js and build javascript files by Babel to output location
'scss:build',   // check with ./src/stylelint.config.js and build css files by SCSS to output location
'content:get',  // get page content json files. Then build html by handlebars / nunjucks to output location and keep watch handlebars / nunjucks files
'js:watch', // keep watch javascript files
'scss:watch',   // keep watch scss files
'content:watch' // keep watch page content json files
``` 
### API
Edit gulp.api.js to add API handle to localhost server.<br/>
e.g.:
```js
const gulpAPI = [
    {
        route: '/api',
        handle: (req, res, next) => {
            res.end();
        }
    }
];
```

### Watch Files Location
#### Fonts Files
```js
['./src/fonts/**/*', '!./src/fonts/**/_*']
```

#### Images Files
```js
['./src/img/**/*', '!./src/img/**/_*', '!./src/img/_**/*']
```

#### Favicon File
```js
'./src/favicon.png'
```

#### Javascript Files
```js
['./src/js/**/*.js', '!./src/js/**/_*.js']
```

#### SCSS Files
```js
['./src/css/**/*.scss', '!./src/css/**/_*.scss']
```

#### Handlebars Files
```js
['./src/html/**/*.handlebars', './src/html/**/*.hbs', '!./src/html/**/_*.handlebars', '!./src/html/**/_*.hbs']
```

#### Nunjucks Files
```js
['./src/html/**/*.html', '!./src/html/**/_*.html']
```

#### HTML Content JSON Files
```js
['./src/data/**/*.json', '!./src/data/**/_*.json']
```

#### Fonts Files
```js
['./src/fonts/**/*', '!./src/fonts/**/_*']
```

#### Fonts Files
```js
['./src/fonts/**/*', '!./src/fonts/**/_*']
```
