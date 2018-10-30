import 'object/object.property';
import 'element/element.property';

export default class component {
    constructor () {
        this._options = {};
    }

    // get object from dataset
    datasetOptions (ele, optionsKey = '', setToEle = false) {
        let _options = {},
            _results = [],
            _isOptions = true,
            _dataKey = '',
            _eles = NodeList.prototype.isPrototypeOf(ele) ? ele : [ele];

        for (let i = 0; i < _eles.length; i++) {
            _options = {};

            _eles[i].getDataset();

            if (typeof _eles[i].dataset === 'object') {
                for (let key in _eles[i].dataset) {
                    _isOptions = optionsKey === '' || key.search(optionsKey) !== -1;

                    if (_isOptions) {
                        _dataKey = optionsKey === '' ? key : key.replace(optionsKey, '');
                        _dataKey = _dataKey.substr(0, 1).toLowerCase() + _dataKey.substr(1);

                        switch (_eles[i].dataset[key]) {
                            case 'false':
                            case 'FALSE':
                            case 'true':
                            case 'TRUE':
                                _options[_dataKey] = _eles[i].dataset[key].toLowerCase() === 'true';
                                break;
                            default:
                                _options[_dataKey] = _eles[i].dataset[key];
                                break;
                        }
                    }
                }
            }

            if (setToEle === true) {
                _dataKey = optionsKey === '' ? 'component' : optionsKey;

                if (typeof _eles[i][_dataKey] === 'object' && _eles[i][_dataKey] !== null)
                    _eles[i][_dataKey] = Object.assign(_eles[i][_dataKey], _options);
                else
                    _eles[i][_dataKey] = _options;
            }

            _results.push(_options);
        }

        return _results;
    }
}
