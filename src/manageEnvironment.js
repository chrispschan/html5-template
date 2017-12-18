const manageEnvironment = function(environment) {
    environment.addFilter('typeof', (obj, type) => typeof obj === type);

    environment.addFilter('findContent', (obj, searchBy, key) => {
        let results = [],
            searchArr = Array.isArray(searchBy) ? searchBy.length > 2 ? searchBy : ['id', searchBy[0]] : ['id', searchBy];

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