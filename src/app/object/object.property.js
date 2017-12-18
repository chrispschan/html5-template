// Object.assign (IE support)
Object.assign = function () {
    return assignObj(arguments);

    function assignObj (objs) {
        let _objs = {};

        for (let i = 0; i < objs.length; i++) {
            if (typeof objs[i] === 'object') {
                for (let key in objs[i]) {
                    if (typeof objs[i][key] === 'object' && !Array.isArray(objs[i][key]))
                        _objs[key] = assignObj([_objs[key] ? _objs[key] : {}, objs[i][key]]);
                    else
                        _objs[key] = objs[i][key];
                }
            }
        }

        return _objs;
    }
};
