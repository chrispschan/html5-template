const fs = require('fs');
const Nunjucks = require('nunjucks');
const getOptions = require('loader-utils').getOptions;
const parseQuery = require('loader-utils').parseQuery;
const path = require('path');

const jsbeautifier = require('js-beautify');

const includeRe = /{%\s*include\s*['"](.*?)['"]\s+%}/g;

module.exports = function (source) {
  const options = getOptions(this);
  const queryData = this.resourceQuery ? parseQuery(this.resourceQuery) : {};
  const contentData = getContent(queryData);
  options.options = options.options || {};
  options.options.noCache = true;
  options.jsBeautifier = options.jsBeautifier || {};

  // Set up Nunjucks.
  const nunjucks = Nunjucks.configure(options.path, options.options);

  // Add globals.
  for (let global in options.globals) {
    nunjucks.addGlobal(global, options.globals[global]);
  }

  nunjucks.addGlobal('content', contentData);

  // environment
  if (typeof options.manageEnvironment === 'function')
    options.manageEnvironment(nunjucks);

  // Add dependencies with includes.
  let includes = getIncludes(path.dirname(this.resourcePath), source);
  includes = includes.filter(uniq).forEach(include => {
    this.addDependency(path.resolve(options.path, include));
  });

  return jsbeautifier.html(nunjucks.renderString(source, options.context), options.jsBeautifier);
};

function getIncludes (templatePath, source) {
  let includes = [];
  let match;
  while (match = includeRe.exec(source)) {
    includes.push(path.resolve(templatePath, match[1]));
  }
  includes = includes.filter(uniq);

  let retIncludes = includes.slice();
  for (let i = 0; i < includes.length; i++) {
    let includePath = path.resolve(templatePath, includes[i]);
    let includeDir = path.dirname(includePath);
    let includeSource = fs.readFileSync(includePath, 'utf8');
    retIncludes = retIncludes.concat(getIncludes(includeDir, includeSource));
  }

  return retIncludes;
}

function uniq (value, index, self) {
  return self.indexOf(value) === index;
}

function getContent (contentPath) {
  let text;
  let content = {};

  if (typeof contentPath === 'object') {
    for (let key in contentPath) {
      text = fs.readFileSync(path.resolve(contentPath[key]), 'utf8');

      if (contentPath[key].search('.scss') !== -1) {
        content[key] = scss2json(text);
      } else if (isJson(text.toString('utf8').replace(/^\uFEFF/, ''))) {
        content[key] = JSON.parse(text.toString('utf8').replace(/^\uFEFF/, ''));
      }
    }
  }

  return content;
}

function isJson (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function scss2json (str) {
    let _tempStrArr = str.replace(new RegExp('\r', 'g'), '').split('\n'),
        _strArr = [],
        _item,
        // _json = [],
        _json = {},
        commentConst = 0,
        _comment,
        _allStrVal,
        _val,
        _tempItem;

    let _getListItem = function (_listItem) {
        let _tempList = _listItem.substr(_listItem.search(/\(/) + 1, _listItem.lastIndexOf(')') - 1),
            _listArr = [],
            _tempListArr,
            _strArr;

        let _replaceStr = function (_str) {
            let _newStrData = _str,
                _tempStr;

            if (Array.isArray(_str)) {
                _newStrData = [];

                for (let i = 0; i < _str.length; i++)
                    _newStrData.push(_replaceStr(_str[i]));
            } else if (typeof _str === 'string') {
                if (_str.search('#str#') !== -1) {
                    _tempStr = _str.match(new RegExp('#str#(.*?)#', 'g'));

                    for (let j = 0; j < _tempStr.length; j++)
                        _newStrData = _str.replace(_tempStr[j], _tempListArr[_tempStr[j].replace('#str#', '').replace('#', '')]);
                } else
                    _newStrData = _str;
            } else
                _newStrData = _str;

            return _newStrData;
        };

        while (_tempList.substr(0, 1) === ' ')
            _tempList = _tempList.substr(1);

        if (_tempList.substr(0, 1) === '(' && _tempList.substr(_tempList.length - 1, 1) === ')')
            _listArr.push(_getListItem(_tempList));
        else {
            if (_tempList.search('\"') === -1 && _tempList.search('\'') === -1) {
                _tempList = _tempList.replace(new RegExp(' ', 'g'), '');
                _tempListArr = _tempList.split(',');

                for (let i = 0; i < _tempListArr.length; i++) {
                    if (_listArr.length > 0) {
                        if (_listArr[_listArr.length - 1].substr(0, 1) === '(') {
                            _listArr[_listArr.length - 1] += `,${_tempListArr[i]}`;

                            if (_listArr[_listArr.length - 1].substr(0, 1) === '(' && _listArr[_listArr.length - 1].substr(_listArr[_listArr.length - 1].length - 1, 1) === ')')
                                _listArr[_listArr.length - 1] = _getListItem(_listArr[_listArr.length - 1]);
                        } else
                            _listArr.push(_tempListArr[i]);
                    } else
                        _listArr.push(_tempListArr[i]);
                }
            } else {
                _tempListArr = _tempList.match(new RegExp('\"(.*?)\"', 'g'));
                for (let i = 0; i < _tempListArr.length; i++)
                    _tempList = _tempList.replace(_tempListArr[i], `#str#${i}#`);

                _listArr = _getListItem('\(' + _tempList + '\)');

                _listArr = _replaceStr(_listArr);
            }
        }

        return _listArr;
    };

    for (let i = 0; i < _tempStrArr.length; i++) {
        if (i === 0)
            _strArr.push(_tempStrArr[i]);
        else {
            switch (_tempStrArr[i].substr(0, 1)) {
                case '@':
                case '/':
                case '$':
                    if (
                        _strArr[_strArr.length - 1].substr(0, 1) === '$' &&
                        (
                            _strArr[_strArr.length - 1].search(';') === -1 ||
                            (
                                _strArr[_strArr.length - 1].search('\'') !== -1 &&
                                _strArr[_strArr.length - 1].lastIndexOf(';') < _strArr[_strArr.length - 1].lastIndexOf('\'')
                            ) ||
                            (
                                _strArr[_strArr.length - 1].search('\"') !== -1 &&
                                _strArr[_strArr.length - 1].lastIndexOf(';') < _strArr[_strArr.length - 1].lastIndexOf('\"')
                            )
                        ) &&
                        _strArr[_strArr.length - 1].search('//') === -1
                    )
                        _strArr[_strArr.length - 1] += _tempStrArr[i];
                    else
                        _strArr.push(_tempStrArr[i]);
                    break;
                case '\t':
                    _tempStrArr[i] = _tempStrArr[i].replace(new RegExp('\t', 'g'), '    ');
                case ' ':
                    _tempStrArr[i] = _tempStrArr[i].replace(new RegExp(' {4}', 'g'), '');
                default:
                    _strArr[_strArr.length - 1] += _tempStrArr[i];
                    break;
            }
        }

        if (_strArr[_strArr.length - 1].search('//') !== 0)
            _strArr[_strArr.length - 1] = _strArr[_strArr.length - 1].replace('//', '    //');
    }

    for (let i = 0; i < _strArr.length; i++) {
        if (_strArr[i] !== '') {
            _item = _strArr[i].split('    //');
            _comment = _strArr[i].search('//') !== -1 ? _strArr[i].substr(_strArr[i].search('//')) : '';
            _allStrVal = [];
            _val = _strArr[i].replace(_comment, '');

            if (_item[0].substr(0, 2) === '//' || _item[0].search('@import') !== -1) {
                _json[`comment${commentConst}`] = _strArr[i];
                while (_json[`comment${commentConst}`].substr(0, 1) === ' ')
                    _json[`comment${commentConst}`] = _json[`comment${commentConst}`].substr(1);
                
                commentConst++;
            } else {
                if (_item[0].search(':') !== -1) {
                    _tempItem = [];
                    _tempItem.push(_item[0].substr(0, _item[0].search(':')));
                    _tempItem.push(_item[0].substr(_item[0].search(':') + 1, (_item[0].lastIndexOf(';') !== -1 ? _item[0].lastIndexOf(';') : _item[0].length) - _item[0].search(':') - 1));
                    _item[0] = _tempItem;

                    while (_item[0][1].substr(0, 1) === ' ')
                        _item[0][1] = _item[0][1].substr(1);

                    if (_item[0][0].search('-fullList') === -1) {
                        if (_item[0][1][0] === '(')// && _item[0][1][_item[0][1].length - 1] === ')')
                            _item[0][1] = _getListItem(_item[0][1]);// _item[0][1].substr(1, _item[0][1].length - 2).split(', ');

                        _json[_item[0][0].substr(1)] = {value: _item[0][1], comment: (_item.length > 1 ? _item[1] : '')};
                    } else
                        _json[_item[0][0].substr(1)] = {value: 'will auto gen', comment: (_item.length > 1 ? _item[1] : '')};
                } else {
                    _json[`comment${commentConst}`] = `${_item[0]}${_item.length > 1 ? `    ${_item[1]}` : ''}`;
                    commentConst++;
                }
            }
        }
    }
    
    return _json;
}
