// check is string a json format
export function isJson (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// scss variables to json format
export function scss2json (str) {
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

                            console.log(_listArr[_listArr.length - 1]);
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

// json object to scss variables
export function json2scss (item) {
    let _scss = '',
        _keys,
        _new,
        _fullList = [],
        _obj;

    let _genArr = function (_arr) {
        let _newStr = '(';

        for (var i = 0; i < _arr.length; i++) {
            if (i !== 0)
                _newStr += ', ';
            if (Array.isArray(_arr[i]))
                _newStr += _genArr(_arr[i]);
            else
                _newStr += _arr[i];
        }

        _newStr += ')';

        return _newStr;
    };

    for (let key in item) {
        if (typeof item[key] === 'string')
            _new = `${item[key]}`;
        else if (typeof item[key].value === 'string') {
            if (key.search('-fullList') === -1) {
                _fullList.push(`(\"${key}\", $${key})`);
                _new = `$${key}: ${item[key].value};`;
            } else {
                _obj = {};
                _obj[key] = {value: _fullList};

                _new = json2scss(_obj).replace('\n', '');
            }
        } else if (Array.isArray(item[key].value)) {
            if (key.search('-fullList') === -1)
                _fullList.push(`(\"${key}\", $${key})`);
            _new = `$${key}: `;
            _new += _genArr(item[key].value);
            _new += ';';
        }
        
        if (typeof item[key].comment === 'string' && item[key].comment !== '')
            _new += `    // ${item[key].comment}`;

        _new += '\n';

        if (_scss !== '') {
            if (_new.search('//') === 0)
                _scss += '\n';
        }

        _scss += _new;
    }
    return _scss;
}
