import 'object/object.property';

// get parameter from window.location/string
window.location.getParameter = function (url) {
    let _vars = [],
        _key = [],
        _results = {};

    if (typeof url !== 'string' && this.search.length > 0)
        _vars = this.search.substr(1).split('&');
    else if (typeof url === 'string' && url.indexOf('?') !== -1)
        _vars = url.substr(url.indexOf('?') + 1).split('&');

    for (let i = 0; i < _vars.length; i++) {
        _key = _vars[i].split('=');

        if (_key.length > 1) {
            if (typeof _results[_key[0]] === 'undefined') {
                _results[_key[0]] = decodeURIComponent(_key[1]);
                if (_key.length > 2) {
                    for (let j = 2; j < _key.length; j++)
                        _results[_key[0]] += `=${decodeURIComponent(_key[j])}`;
                }
            }
        }
    }

    return _results;
};

// auto get window.location.parameter
window.location.parameter = window.location.getParameter();

// set parameter to window.location/string
window.location.setParameter = function (parameter = {}, url) {
    let _url = typeof url === 'string' ? url : '',
        _sameParameter = true,
        _parameter = typeof url !== 'string' ? this.getParameter() : this.getParameter(url);

    if (_url.indexOf('?') === -1)
        _url += '?';
    else
        _url = _url.substr(0, _url.indexOf('?') + 1);

    if (typeof parameter === 'object')
        _parameter = Object.deepAssign(_parameter, parameter);

    if (_url[_url.length - 1] !== '&' && _url[_url.length - 1] !== '?')
        _url += '&';

    for (let key in _parameter)
        _url += `${key}=${encodeURIComponent(_parameter[key])}&`;

    _parameter = this.getParameter(_url);

    if (Object.keys(_parameter).length === 0)
        _url = _url.substr(0, _url.indexOf('?'));
    else
        _url = _url.substr(0, _url.length - 1);

    if (_url === '' || _url.indexOf('?') === 0) {
        if (Object.keys(this.parameter).length === Object.keys(_parameter).length) {
            for (let key in parameter) {
                if (this.parameter[key] !== _parameter[key])
                    _sameParameter = false;
            }
        } else
            _sameParameter = false;
        
        if (!_sameParameter)
            this.search = _url;
    }
    
    return _url;
};
