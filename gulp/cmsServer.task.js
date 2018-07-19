import fs from 'fs';
import del from 'del';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import ssi from 'connect-ssi';
import directoryMap from 'gulp-directory-map';

import gulpOptions from './../gulp.options.js';

import {isJson, scss2json, json2scss} from './json.function.js';

const cmsServe = browserSync.create(),
watchFiles = {
    cmsServe: {
        root: './cms/',
        temp: 'cms/temp/data/',
        scssTemp: 'cms/temp/app/',
        output: 'src/data/',
        scssOutput: 'src/app/',
        folderMenu: 'folderMenu.json'
    },
    content: ['./src/data/**/*.json', '!./src/data/**/_*.json'],    // html content json
    scssVal: ['./src/app/**/*.variables.scss', '!./src/app/**/_*.variables.scss']
};

let options = {
    cmsServe: {
        server: watchFiles.cmsServe.root,
        port: gulpOptions.cmsServer.port,
        baseDir: watchFiles.cmsServe.root,
        open: false,
        ui: false,
        middleware: [
            ssi({
                baseDir: watchFiles.cmsServe.root,
                ext: '.html'
            }),
            {
                route: '/api/getFolderStructure',
                handle: (req, res, next) => {
                    let _data = '',
                        _watch;

                    req.on('data', function(chunk) {
                        _data += chunk.toString();
                        if (isJson(_data)) {
                            _data = JSON.parse(_data);

                            _watch = _data.type === 'style' ? watchFiles.scssVal : watchFiles.content;

                            gulp.src(_watch)
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
                    });
                }
            },
            {
                route: '/api/getJson',
                handle: (req, res, next) => {
                    let _data = '';
                    let _path = '';
                    let _temp = watchFiles.cmsServe.temp;
                    let _output = watchFiles.cmsServe.output;

                    req.on('data', function(chunk) {
                        _data += chunk.toString();
                        if (isJson(_data)) {
                            _data = JSON.parse(_data);
                            if (_data.path.search('.scss') !== -1) {
                                _temp = watchFiles.cmsServe.scssTemp;
                                _output = watchFiles.cmsServe.scssOutput;
                            }
                            if (_data.temp === true) {
                                _path = _temp + _data.path;
                            } else {
                                _path = _output + _data.path;
                            }
                            

                            fs.stat(_path, function(err, stat) {
                                if(err == null) {
                                    _path = _path;
                                } else if(err.code == 'ENOENT') {
                                    if (_data.temp === true) _path = _output + _data.path;
                                    else _path = ''
                                } else {
                                    if (_data.temp === true) _path = _output + _data.path;
                                    else _path = ''
                                }

                                if (_path !== '') {
                                    fs.readFile(_path, 'utf8', (err, data) => {
                                        let _json = _data.path.search('.scss') !== -1 && _path.search('cms/') !== 0 ? scss2json(data) : data;

                                        if (err) {
                                            res.end(JSON.stringify({}));

                                            return console.log(err);
                                        }

                                        if (typeof _json === 'string') {
                                            if (_json[0] !== '{' && _json[0] !== '[' && _json[0] !== '"') _json = _json.substr(1);
                                            res.end(JSON.stringify(JSON.parse(_json)));
                                        } else
                                            res.end(JSON.stringify(_json));
                                        
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
                    let _pathArr;
                    let _dir = '.';
                    let _temp = watchFiles.cmsServe.temp;
                    let _output = watchFiles.cmsServe.output;
                    let _newData;
                    req.on('data', function(chunk) {
                        _data += chunk.toString();
                        if (isJson(_data)) {
                            _data = JSON.parse(_data);
                            if (_data.path.search('.scss') !== -1) {
                                _temp = watchFiles.cmsServe.scssTemp;
                                _output = watchFiles.cmsServe.scssOutput;
                            }
                            if (_data.temp === true) {
                                _path = _temp + _data.path;
                            } else {
                                _path = _output + _data.path;
                            }

                            if (typeof _data.path !== 'undefined' && typeof _data.json !== 'undefined') {
                                _pathArr = _path.split('/');
                                _newData = _data.path.search('.scss') !== -1 && _path.search('cms') === -1 ? json2scss(_data.json) : JSON.stringify(_data.json, null, 2);
                                for (let i = 0; i < _pathArr.length - 1; i++) {
                                    _dir += `/${_pathArr[i]}`;

                                    if (!fs.existsSync(_dir))
                                        fs.mkdirSync(_dir);
                                }

                                fs.writeFile(_path, _newData, function(err) {
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
    }
};

// cms server setup
gulp.task('cmsServer:setup', () => {
    del([`./${watchFiles.cmsServe.temp}**/*.json`, `./${watchFiles.cmsServe.temp}**/*.scss`]);
    return cmsServe.init(options.cmsServe);
});
