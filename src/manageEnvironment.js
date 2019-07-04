const manageEnvironment = function(environment) {
    /*----------  check is typeof obj === type  ----------*/
    environment.addFilter('typeof', (obj, type) => type === 'array' ? (Array.isArray(obj)) : (typeof obj === type));

    /*----------  textText to text-text  ----------*/
    environment.addFilter('toDataset', (obj) => {
        let results = obj,
            keyArr;

        if (typeof results === 'string') {
            results = results.substr(0, 1).toLowerCase() + results.substr(1);
            keyArr = results.split(/(?=[A-Z])/);

            for (let i = 0; i < keyArr.length; i++)
                keyArr[i] = keyArr[i].toLowerCase();

            results = keyArr.join('-');
        }

        return results;
    });

    /*----------  assign object  ----------*/
    environment.addFilter('assignObj', (obj, objArr) => {
        let _objArr = Array.isArray(objArr) ? objArr : [objArr];
        _objArr.unshift(obj);

        return assignObj(_objArr);

        function assignObj (objs) {
            let _objs = {};

            for (let i = 0; i < objs.length; i++) {
                if (typeof objs[i] === 'object') {
                    for (let key in objs[i]) {
                        if (typeof objs[i][key] === 'object' && !Array.isArray(objs[i][key]))
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
    });

    /*----------  change array item to object  ----------*/
    environment.addFilter('arr2obj', (obj) => {
        if (Array.isArray(obj))
            return Object.deepAssign({}, obj);
        else
            return obj;
    });

    /*----------  check tag can use <div> inside  ----------*/
    environment.addFilter('canDivInside', (obj) => {
        let canInsideTags = [
            'artiicle',
            'aside',
            'body',
            'details',
            'div',
            'form',
            'footer',
            'header',
            'main',
            'section'
        ];

        if (typeof obj === 'string')
            return canInsideTags.indexOf(obj) !== -1
        else
            return true;
    });

    /*----------  find key: value(searchBy) in object array  ----------*/
    environment.addFilter('findContent', (obj, searchBy, key) => {
        let results = [],
            searchArr = Array.isArray(searchBy) ? searchBy.length > 2 ? searchBy : ['id', searchBy[0]] : ['id', typeof searchBy === 'string' ? searchBy : ''];

        function outputKey (item) {
            if (key && key != '') {
                if (Array.isArray(item[key])) {
                    for (let i = 0; i < item[key].length; i++)
                        results.push(item[key][i]);
                } else results.push(item[key]);
            } else results.push(item);
        }

        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                if (typeof obj[i] === 'object') {
                    if (searchBy !== '') {
                        if (obj[i][searchArr[0]] == searchArr[1])
                            outputKey(obj[i]);
                    } else outputKey(obj[i]);
                }
            }
        } else if (typeof obj === 'object') {
            if (searchBy !== '') {
                if (obj[searchArr[0]] == searchArr[1]) outputKey(obj);
            } else outputKey(obj);
        } else if (searchBy === '' && key === '') results.push(obj);

        return results;
    });
}

module.exports = manageEnvironment;