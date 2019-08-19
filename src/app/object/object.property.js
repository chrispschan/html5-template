// Object.assign (IE support)
Object.deepAssign = function () {
    return assignObj(arguments);

    function assignObj (objs) {
        let _objs = {};

        for (let i = 0; i < objs.length; i++) {
            if (typeof objs[i] === 'object') {
                for (let key in objs[i]) {
                    if (typeof objs[i][key] === 'object' && !Array.isArray(objs[i][key]) && objs[i][key].constructor !== RegExp && Object.prototype.toString.call(objs[i][key]) !== '[object Date]')
                        _objs[key] = assignObj([_objs[key] ? _objs[key] : {}, objs[i][key]]);
                    else if (Array.isArray(objs[i][key])) {
                        _objs[key] = [];

                        for (let j = 0; j < objs[i][key].length; j++) {
                            if (typeof objs[i][key][j] === 'object')
                                _objs[key].push(assignObj([{}, objs[i][key][j]]));
                            else
                                _objs[key].push(objs[i][key][j]);
                        }
                    } else
                        _objs[key] = objs[i][key];
                }
            }
        }

        return _objs;
    }
};

if (typeof Object.assign !== 'function')
    Object.assign = Object.deepAssign;
