import handlebars from 'handlebars';

let __switch_stack__ = [],
    __blocks__ = Object.create(null);

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

const helpers = {
    extend: (name, context, options) => {
        var block = __blocks__[name];
        if (!block)
            block = __blocks__[name] = [];

        block.push(context.fn(this));
    },
    block: (name, options) => {
        var val = (__blocks__[name] || []).join('\n');

        // clear the block
        __blocks__[name] = [];
        return val;
    },
    setVal: (options) => {
        let vals = options.fn(this).replace(/ = /g, '=').replace(/    /g, '').replace(/\t/g, '').replace(/\r/g, '').replace(/\n/g, ''),
            newVal,
            objectKey;
        vals = vals.split(';');
        for (let i=0; i<vals.length; i++) {
            if (vals[i] != '') {
                newVal = vals[i].split('=');
                if (newVal.length >= 2) {
                    newVal[0] = newVal[0].split(':');
                    if (newVal[0].length >= 2) {
                        switch (newVal[0][1]) {
                            case 'boolean':
                                newVal[1] = newVal[1] === 'true' ? true : false;
                                break;
                            case 'number':
                                newVal[1] = Number(newVal[1]);
                                break;
                            case 'object':
                                objectKey = newVal[1].split('.');
                                newVal[1] = options.data.root._parent;
                                for (let j=0; j<objectKey.length; j++)
                                    newVal[1] = newVal[1][objectKey[j]];
                                break;
                            case 'json':
                                newVal[1] = JSON.parse(newVal[1]);
                                break;
                            case 'dataset':
                                let _data = JSON.parse(newVal[1]);
                                let _newData = {};
                                let _keyLower;
                                let _keyArr;

                                if (typeof _data === 'object') {
                                    for (let key in _data) {
                                        _keyLower = key.substr(0, 1).toLowerCase() + key.substr(1)
                                        _keyArr = _keyLower.split(/(?=[A-Z])/);

                                        for (let j = 0; j < _keyArr.length; j++)
                                            _keyArr[j] = _keyArr[j].toLowerCase();

                                        _newData[_keyArr.join('-')] = _data[key];
                                    }

                                    newVal[1] = _newData;
                                } else
                                    newVal[1] = _data;
                                break;
                            case 'canDivInside':
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

                                newVal[1] = canInsideTags.indexOf(newVal[1]) !== -1
                                break;
                            case 'assignObj':
                                let _objArr = JSON.parse(newVal[1]);

                                if (!Array.isArray(_objArr)) _objArr = [_objArr];

                                newVal[1] = assignObj(_objArr);
                                break;
                            case 'content':
                                objectKey = newVal[1].split('.');
                                newVal[1] = options.data.root._parent;
                                if (typeof options.data.local.lang !== 'undefined') {
                                    lang = options.data.local.lang;
                                }

                                for (let j=0; j<objectKey.length; j++) {
                                    newVal[1] = newVal[1][objectKey[j]];

                                    if (lang !== null) {
                                        for (let k in newVal[1]) {
                                            _newVal[k] = {};

                                            if (k === 'iconText' || k === 'option') {
                                                for (let l = 0; l < newVal[1][k].length; l++) {
                                                    _newObj = newVal[1][k][l];
                                                    _newObj.text = newVal[1][k][l][lang];

                                                    if (typeof _newVal[k][newVal[1][k][l].id] === 'undefined')
                                                        _newVal[k][newVal[1][k][l].id] = [_newObj];
                                                    else if (Array.isArray(_newVal[k][newVal[1][k][l].id])) {
                                                        _newVal[k][newVal[1][k][l].id].push(_newObj);
                                                    }
                                                }
                                            } else {
                                                for (let l = 0; l < newVal[1][k].length; l++) {
                                                    if (typeof _newVal[k][newVal[1][k][l].id] === 'undefined')
                                                        _newVal[k][newVal[1][k][l].id] = newVal[1][k][l][lang];
                                                    else if (Array.isArray(_newVal[k][newVal[1][k][l].id])) {
                                                        _newVal[k][newVal[1][k][l].id].push(newVal[1][k][l][lang]);
                                                    } else {
                                                        _newVal[k][newVal[1][k][l].id] = [_newVal[k][newVal[1][k][l].id], newVal[1][k][l][lang]];
                                                    }
                                                }
                                            }
                                        }

                                        newVal[1] = _newVal;
                                    }
                                }
                                break;
                            case 'string':
                            default:
                                break;
                        }    
                    } else newVal[0] = [newVal[0], 'string'];

                    options.data.local[newVal[0][0]] = newVal[1];
                }
            }
        }
    },
    ifCond : (v1, operator, v2, options) => {
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    },
    ifTypeof: (val, type, options) => {
        return typeof type === 'array' ? (Array.isArray(val) ? options.fn(this) : options.inverse(this)) : (typeof val === type ? options.fn(this) : options.inverse(this));
    },
    switch: (val, options) => {
        __switch_stack__.push({
            switch_match: false,
            switch_value: val
        });

        let html = options.fn(this);

        __switch_stack__.pop();

        return html;
    },
    case: (val, options) => {
        let stack = __switch_stack__[__switch_stack__.length - 1],
        caseValues = val.split('||');
        
        if (stack.switch_match || caseValues.indexOf(stack.switch_value) === -1)
            return '';
        else {
            stack.switch_match = true;
            return options.fn(this);
        }
    },
    default: (options) => {
        let stack = __switch_stack__[__switch_stack__.length - 1];
         if (!stack.switch_match)
            return options.fn(this);
    },
    obj2json: (options) => {
        if (typeof options === 'object')
            return JSON.stringify(options);

        return "{}";
    },
    eachContent: (data, searchBy, key, options) => {
        let ret = '',
            searchArr = searchBy.split('='),
            result = '',
            index = 0,
            outputData = options.data ? handlebars.createFrame(options.data) : {showIndex: 0, showLast: false, showFirst: false, showEven: false, showOdd: false};

        if (searchArr.length == 1) searchArr.splice(0, 0, 'id'); 

        result = Array.isArray(data) ? searchArr[1] === '' ? data : data.filter((e) => e[searchArr[0]] == searchArr[1]) : data !== undefined ? [data] : '';

        function outputContent (_data) {
            index++;
            outputData.showIndex = index;
            outputData.showFirst = index == 1;
            outputData.showEven = index % 2 == 0;
            outputData.showOdd = !outputData.showEven;
            ret += options.fn(_data, {data: outputData, blockParams: [_data, index, outputData.showFirst, outputData.showLast, outputData.showOdd, outputData.showEven]});
        }

        for (let i=0; i<result.length; i++) {
            if (key !== '') {
                if (result[i][key] !== undefined && result[i][key] !== '') {
                    if (Array.isArray(result[i][key])) {
                        for(let j=0; j<result[i][key].length; j++) {
                            outputData.showLast = (j == result[i][key].length -1 && i == result.length - 1);
                            outputContent(result[i][key][j]);
                        }
                    } else {
                        outputData.showLast = i == result.length - 1;
                        outputContent(result[i][key]);
                    }
                }
            } else {
                outputData.showLast = i == result.length - 1;
                outputContent(result[i]);
            }
        }

        return ret;
    }
}

module.exports = helpers;