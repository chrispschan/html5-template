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
    let _strArr = str.replace(new RegExp('\r', 'g'), '').split('\n'),
        _item,
        _json = [];

    for (let i = 0; i < _strArr.length; i++) {
        if (_strArr[i] !== '') {
            _item = _strArr[i].split('    // ');

            if (_item[0].substr(0, 2) === '//' || _item[0].search('@import') !== -1) {
                _json.push(_item.length > 1 ? `${_item[0]}${_item[1]}` : _item[0]);
            } else {
                _item[0] = _item[0].split(': ');

                if (_item[0].length > 1) {
                    if (_item[0][0].search('-fullList') === -1) {
                        _item[0][1] = _item[0][1].replace(';', '');
                        if (_item[0][1][0] === '(' && _item[0][1][_item[0][1].length - 1] === ')') {
                            _item[0][1] = _item[0][1].substr(1, _item[0][1].length - 2).split(', ');
                        }

                        _json.push({id: _item[0][0].substr(1), value: _item[0][1], comment:(_item.length > 1 ? _item[1] : '')});
                    } else {
                        _json.push({id: _item[0][0].substr(1), value: 'will auto gem', comment:(_item.length > 1 ? _item[1] : '')});
                    }
                    
                } else {
                    _json.push(`${_item[0]}${_item.length > 1 ? `    ${_item[1]}` : ''}`);
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
        _new;

    if (typeof item === 'object' && !Array.isArray(item)) {
        _keys = Object.keys(item);

        if (_keys.length === 1) {
            _scss = '$' + _keys[0] + ': ' + item[_keys[0]] + ';\n';
        } else if (_keys.length > 0) {
            if (_keys.indexOf('id') !== -1 && _keys.indexOf('value') !== -1) {
                if (typeof item.value === 'string')
                    _scss = `$${item.id}: ${item.value};`;
                else if (Array.isArray(item.value)) {
                    _scss = `$${item.id}: (`;
                    for (let i = 0; i < item.value.length; i++) {
                        if (i !== 0)
                            _scss += ', ';
                        _scss += `${item.value[i]}`;
                    }
                    _scss += ');';
                }

                if (typeof item.comment === 'string') {
                    if (item.comment !== '')
                        _scss += `    // ${item.comment}`;
                }

                _scss += '\n';
            } else {
                for (let k in item) {
                    _new = json2scss(item[k]);
                    if (_scss !== '' && _new.search('//') === 0)
                        _scss += '\n';
                    _scss += _new;
                }
            }
        }
    } else if (Array.isArray(item)) {
        let _fullList = [];
        for (let i = 0; i < item.length; i++) {
            if (typeof item[i].id !== 'undefined' && typeof item[i].value !== 'undefined') {
                if (item[i].id.search('-fullList') === -1)
                    _fullList.push(`(\"${item[i].id}\", $${item[i].id})`);
                else item[i].value = _fullList;
            }
            _new = json2scss(item[i]);
            if (_scss !== '' && _new.search('//') === 0)
                _scss += '\n';
            _scss += _new;
        }
    } else if (typeof item === 'string')
        _scss = `${item}\n`;
    
    return _scss;
}