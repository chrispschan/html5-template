import 'object/object.property';
import 'element/element.property';

export default class FormInput {
    constructor (formInput = '.formInput', options = {}) {
        this._options = Object.deepAssign({
            disabled: false,
            readOnly: false,
            required: false,
            error: false,
            errorMessage: {
                default: ''
            },
            validation: []
        }, options);

        this._formInputEle = document.querySelectorAll(formInput);
        this._disabledClass = 'formInput--disabled';
        this._readonlyClass = 'formInput--readonly';
        this._requiredClass = 'formInput--required';
        this._errorClass = 'formInput--error';
        this._inputClass = 'formInput__input';
        this._inputDisabledClass = 'formInput__input--disabled';
        this._inputReadonlyClass = 'formInput__input--readonly';
        this._inputRequiredClass = 'formInput__input--required';
        this._inputErrorClass = 'formInput__input--error';
        this._errorMsgClass = 'formInput__note--error';
        this._errorHideMsgClass = 'formInput__note--hide';
        this._errorShowMsgClass = 'formInput__note--show';
        
        this._initformInput(this);
    }

    _initformInput (self) {
        let _options = {},
            _inputEle,
            _validation = [],
            _newValidation = [],
            _pattern,
            _valueKey;

        for (let i = 0; i < self._formInputEle.length; i++) {
            _options = Object.deepAssign({ index: i }, self._options);
            _inputEle = self._formInputEle[i].querySelectorAll(`.${this._inputClass}`);

            self._formInputEle[i].getDataset();
            self._formInputEle[i].formInputOptions = _options;

            if (self._formInputEle[i].hasClass(self._disabledClass) || self._formInputEle[i].disabled === true)
                self._formInputEle[i].formInputOptions.disabled = true;

            if (self._formInputEle[i].hasClass(self._readonlyClass))
                self._formInputEle[i].formInputOptions.readOnly = true;

            if (self._formInputEle[i].hasClass(self._requiredClass))
                self._formInputEle[i].formInputOptions.required = true;

            if (self._formInputEle[i].hasClass(self._errorClass))
                self._formInputEle[i].formInputOptions.error = true;

            /*----------  self options from dataset  ----------*/
            if (typeof self._formInputEle[i].dataset === 'object') {
                for (let key in self._formInputEle[i].dataset)
                    self._formInputEle[i].formInputOptions[key] = self._formInputEle[i].dataset[key];
            }

            if (Array.isArray(self._formInputEle[i].formInputOptions.validation)) {
                _validation = _validation.concat(self._formInputEle[i].formInputOptions.validation);
                self._formInputEle[i].formInputOptions.validation = {};
            }

            for (let j = 0; j < _inputEle.length; j++) {
                _newValidation = [];
                _inputEle[j].getDataset();
                _inputEle[j].formInputEle = self._formInputEle[i];
                _pattern = _inputEle[j].getAttribute('pattern');
                _valueKey = _inputEle[j].dataset.valueKey;

                if (typeof _valueKey === 'undefined' || _valueKey === null || _valueKey === '') {
                    _valueKey = _inputEle[j].name;

                    if (typeof _valueKey === 'undefined' || _valueKey === null || _valueKey === '')
                        _valueKey = _inputEle[j].id;
                }

                if (self._formInputEle[i].formInputOptions.required || _inputEle[j].required)
                    _newValidation.push({callback: this._checkInputRequired, type: 'required'});

                if ((_inputEle[j].max || _inputEle[j].min) && _inputEle[j].type === 'number')
                    _newValidation.push({callback: this._checkInputRange, type: 'range', max: _inputEle[j].max, min: _inputEle[j].min});

                if (_pattern !== null && _pattern !== '')
                    _newValidation.push({regex: new RegExp(_pattern, 'g'), type: 'pattern'});

                _newValidation = _newValidation.concat(_validation);

                if (Array.isArray(self._formInputEle[i].formInputOptions.validation[_valueKey]))
                    _newValidation = _newValidation.concat(self._formInputEle[i].formInputOptions.validation[_valueKey]);

                self._formInputEle[i].formInputOptions.validation[_valueKey] = _newValidation;

                this._addEvents(self._formInputEle[i], _inputEle[j]);
            }

            this.setRequired(self._formInputEle[i].formInputOptions.required);
            this.setError({
                isError: self._formInputEle[i].formInputOptions.error,
                message: self._formInputEle[i].formInputOptions.errorMessage.default
            });
            this.setReadonly(self._formInputEle[i].formInputOptions.readOnly);
            this.setDisabled(self._formInputEle[i].formInputOptions.disabled);
        }
    }

    _addEvents (formInputEle, inputEle) {
        if (typeof formInputEle.formInputOptions.events === 'object') {
            for (let key in formInputEle.formInputOptions.events) {
                if (typeof formInputEle.formInputOptions.events[key] === 'function') {
                    inputEle.addEventListener(key, (event) => {
                        let _options;
                        if (event.target.formInputEle) {
                            _options = event.target.formInputEle.formInputOptions;
                            
                            if (_options) {
                                if (typeof _options.events === 'object') {
                                    if (typeof _options.events[event.type] === 'function')
                                        _options.events[event.type](event, this);
                                }
                            }
                        }
                    });
                }
            }
        }
    }

    _getInputEle (options, inputKey = -1, index = -1) {
        let _isToggle = typeof options === 'object' ? (options.isToggle !== false) : (options !== false),
            _class = typeof options === 'object' ? (typeof options.class === 'string' ? options.class : '') : '',
            _inputEle,
            _getInput = (_formInputIndex) => {
                if (inputKey === -1) {
                    if (_isToggle === false && _class !== '')
                        this._formInputEle[_formInputIndex].removeClass(_class);
                    else if (_class !== '')
                        this._formInputEle[_formInputIndex].addClass(_class);
                    
                    _inputEle = this._formInputEle[_formInputIndex].querySelectorAll(`.${this._inputClass}`);
                } else {
                    if (_class !== '')
                        this._formInputEle[_formInputIndex].removeClass(_class);
                    
                    _inputEle = this._formInputEle[_formInputIndex].querySelectorAll(`.${this._inputClass}[data-value-key="${inputKey}"]`);
                    if (_inputEle.length === 0)
                        _inputEle = this._formInputEle[_formInputIndex].querySelectorAll(`.${this._inputClass}[nama="${inputKey}"]`);
                    if (_inputEle.length === 0)
                        _inputEle = this._formInputEle[_formInputIndex].querySelectorAll(`.${this._inputClass}#${inputKey}`);
                }
            };

        if (index === -1) {
            for (let i = 0; i < this._formInputEle.length; i++)
                _getInput(i);
        } else if (this._formInputEle[index])
            _getInput(index);

        return _inputEle;
    }

    _setInputState (inputEle, options) {
        let _isToggle = typeof options === 'object' ? (options.isToggle !== false) : (options !== false),
            _class = typeof options === 'object' ? (typeof options.class === 'string' ? options.class : '') : '',
            _state = typeof options === 'object' ? (typeof options.state === 'string' ? options.state : null) : null;

        if (inputEle.length > 0) {
            for (let i = 0; i < inputEle.length; i++) {
                if (_state !== null) {
                    if ((_state === 'readOnly' && inputEle[i].tagName !== 'SELECT') || _state !== 'readOnly')
                        inputEle[i][_state] = _isToggle;
                }

                if (_isToggle === false)
                    inputEle[i].removeClass(_class);
                else
                    inputEle[i].addClass(_class);
            }
        }
    }

    _checkValidation (value, validations, errors = {}) {
        let _isValid = true,
            _isCaseValid = true,
            _msg = [],
            _callbackVal;

        if (Array.isArray(validations)) {
            for (let i = 0; i < validations.length; i++) {
                _isCaseValid = true;
                if (validations[i].regex && typeof value === 'string' && value !== '') {
                    if (typeof validations[i].regex === 'string')
                        validations[i].regex = new RegExp(validations[i].regex, 'g');
                    if (!value.match(validations[i].regex))
                        _isCaseValid = false;
                }

                if (typeof validations[i].callback === 'function') {
                    _callbackVal = validations[i].callback(value, validations[i]);

                    if (_callbackVal === false)
                        _isCaseValid = false;
                }

                if (_isCaseValid === false) {
                    _isValid = false;

                    if (typeof validations[i].message === 'string' && validations[i].message !== '')
                        _msg.push(validations[i].message);
                    else if (typeof validations[i].type === 'string') {
                        if (typeof errors[validations[i].type] === 'string')
                            _msg.push(errors[validations[i].type]);
                    } else
                        _msg.push(errors.default);
                }
            }
        }

        return {isValid: _isValid, message: _msg};
    }

    _checkInputRequired (value) {
        if (Array.isArray(value))
            return value.length > 0;
        else
            return value !== '' && value !== false;
    }

    _checkInputRange (value, options) {
        let _value = parseFloat(value),
            _max = parseFloat(options.max),
            _min = parseFloat(options.min);
        
        if (!isNaN(_value)) {
            if (!isNaN(_max)) {
                if (_value > _max)
                    return false;
            }

            if (!isNaN(_min)) {
                if (_value < _min)
                    return false;
            }

            return true;
        } else if (value !== '')
            return false;
    }

    _getValue (inputEle) {
        let _value;

        switch (inputEle.type) {
            case 'checkbox':
            case 'radio':
                _value = inputEle.checked;
                break;
            case 'number':
                _value = parseFloat(inputEle.value);
                if (isNaN(_value))
                    _value = inputEle.value;
                break;
            default:
                if (inputEle.tagName === 'SELECT')
                    _value = inputEle.options[inputEle.selectedIndex].value;
                else
                    _value = inputEle.value;
                break;
        }

        return _value;
    }

    _setValue (inputEle, value) {
        switch (inputEle.type) {
            case 'checkbox':
                inputEle.checked = value !== 'false' && value !== false;
                break;
            case 'radio':
                inputEle.checked = value === true || inputEle.value === value;
                break;
            default:
                if (inputEle.tagName === 'SELECT')
                    inputEle.value = value === false || typeof value !== 'string' ? '' : value;
                else
                    inputEle.value = value === false || typeof value !== 'string' ? '' : value;
                break;
        }
    }

    setDisabled (isDisabled, inputKey = -1, index = -1) {
        let _inputEle = this._getInputEle({isToggle: isDisabled, class: this._disabledClass}, inputKey, index),
            _setDisabled = (_formInputIndex) => {
                if (this._formInputEle[_formInputIndex].tagName === 'FIELDSET' && inputKey === -1)
                    this._formInputEle[_formInputIndex].disabled = isDisabled;
                else
                    this._formInputEle[_formInputIndex].disabled = false;
            };

        if (index === -1) {
            for (let i = 0; i < this._formInputEle.length; i++)
                _setDisabled(i);
        } else if (this._formInputEle[index])
            _setDisabled(index);
        
        if (isDisabled !== false) {
            this.setReadonly(false, inputKey, index);
            this.setError(false, inputKey, index);
        }

        this._setInputState(_inputEle, {state: 'disabled', isToggle: isDisabled, class: this._inputDisabledClass});
    }

    setReadonly (isReadonly, inputKey = -1, index = -1) {
        let _inputEle = this._getInputEle({isToggle: isReadonly, class: this._readonlyClass}, inputKey, index);
        
        if (isReadonly !== false) {
            this.setDisabled(false, inputKey, index);
            this.setError(false, inputKey, index);
        }

        this._setInputState(_inputEle, {state: 'readOnly', isToggle: isReadonly, class: this._inputReadonlyClass});
    }

    setRequired (isRequired, inputKey = -1, index = -1) {
        let _inputEle = this._getInputEle({isToggle: isRequired, class: this._requiredClass}, inputKey, index);
            
        this._setInputState(_inputEle, {state: 'required', isToggle: isRequired, class: this._inputRequiredClass});
    }

    setError (options, inputKey = -1, index = -1) {
        let _inputEle,
            _errorMsgEle,
            _index,
            _isError = typeof options === 'object' ? (options.isError !== false) : (options !== false),
            _setMsg = (_formInputIndex) => {
                _errorMsgEle = this._formInputEle[_formInputIndex].querySelectorAll(`.${this._errorMsgClass}`);
                    
                for (_index = 0; _index < _errorMsgEle.length; _index++) {
                    _errorMsgEle[_index].removeClass(this._errorHideMsgClass);
                    _errorMsgEle[_index].removeClass(this._errorShowMsgClass);

                    if (typeof options === 'object') {
                        if (options.message && options.message !== '')
                            _errorMsgEle[_index].innerHTML = options.message;
                        else if (options.message === '')
                            _errorMsgEle[_index].addClass(this._errorHideMsgClass);
                    }

                    if (this._formInputEle[_formInputIndex].querySelectorAll(`.${this._inputErrorClass}`).length > 0)
                        _errorMsgEle[_index].addClass(this._errorShowMsgClass);
                }
            };

        if (_isError !== false) {
            this.setReadonly(false, inputKey, index);
            this.setDisabled(false, inputKey, index);
        }

        _inputEle = this._getInputEle({isToggle: _isError, class: this._errorClass}, inputKey, index);
    
        this._setInputState(_inputEle, {isToggle: _isError, class: this._inputErrorClass});
        
        if (index === -1) {
            for (let i = 0; i < this._formInputEle.length; i++)
                _setMsg(i);
        } else if (this._formInputEle[index])
            _setMsg(index);
    }

    setValue (value, inputKey = -1, index = -1) {
        let _inputEle,
            _index,
            _value,
            _valueKey,
            _setInput = (_formInputIndex) => {
                if (inputKey === -1)
                    _inputEle = this._formInputEle[_formInputIndex].querySelectorAll(`.${this._inputClass}`);
                else {
                    _inputEle = this._formInputEle[_formInputIndex].querySelectorAll(`.${this._inputClass}[data-value-key="${inputKey}"]`);
                    if (_inputEle.length === 0)
                        _inputEle = this._formInputEle[_formInputIndex].querySelectorAll(`.${this._inputClass}[nama="${inputKey}"]`);
                    if (_inputEle.length === 0)
                        _inputEle = this._formInputEle[_formInputIndex].querySelectorAll(`.${this._inputClass}#${inputKey}`);
                }

                if (_inputEle.length > 0) {
                    for (_index = 0; _index < _inputEle.length; _index++) {
                        if (typeof value !== 'object')
                            this._setValue(_inputEle[_index], value);
                        else {
                            if (_inputEle[_index].dataset.valueKey)
                                _valueKey = _inputEle[_index].dataset.valueKey;
                            else if (_inputEle[_index].name !== null && _inputEle[_index].name !== '')
                                _valueKey = _inputEle[_index].name;
                            else
                                _valueKey = _inputEle[_index].id;

                            if (typeof value[_valueKey] !== 'undefined') {
                                _value = value[_valueKey];
                                if (Array.isArray(value[_valueKey]))
                                    _value = value[_valueKey].indexOf(_inputEle[_index].value) !== -1;

                                this._setValue(_inputEle[_index], _value);
                            } else if (inputKey === -1)
                                this._setValue(_inputEle[_index], false);
                        }
                    }
                }
            };

        if (index === -1) {
            for (let i = 0; i < this._formInputEle.length; i++)
                _setInput(i);
        } else if (this._formInputEle[index])
            _setInput(index);
    }

    validation (inputKey = -1, index = -1) {
        let _value = this.value,
            _validation,
            _errorMsg,
            _errors = [],
            _results,
            _isValid = true,
            _checkValidation = (_formInputIndex) => {
                _validation = this._formInputEle[_formInputIndex].formInputOptions.validation;
                _errorMsg = this._formInputEle[_formInputIndex].formInputOptions.errorMessage;

                if (inputKey === -1) {
                    if (typeof _value[_formInputIndex] === 'object') {
                        for (let key in _value[_formInputIndex]) {
                            _results = this._checkValidation(_value[_formInputIndex][key], _validation[key], _errorMsg);
                            
                            _errors = _errors.concat(_results.message.filter(msg => _errors.indexOf(msg) === -1));

                            this.setError({ isError: !_results.isValid, message: _errors.join('<br />') }, key, _formInputIndex);
                        }
                    } else {
                        _results = this._checkValidation(_value[_formInputIndex], _validation[Object.keys(_validation)[0]], _errorMsg);
                        _errors = _errors.concat(_results.message.filter(msg => _errors.indexOf(msg) === -1));

                        this.setError({ isError: !_results.isValid, message: _errors.join('<br />') }, -1, _formInputIndex);
                    }
                } else if (typeof _value[_formInputIndex][inputKey] !== 'undefined') {
                    _results = this._checkValidation(_value[_formInputIndex][inputKey], _validation[inputKey], _errorMsg);
                    _errors = _errors.concat(_results.message.filter(msg => _errors.indexOf(msg) === -1));

                    this.setError({ isError: !_results.isValid, message: _errors.join('<br />') }, -1, _formInputIndex);
                }
            };

        if (index === -1) {
            for (let i = 0; i < this._formInputEle.length; i++) {
                _errors = [];
                _checkValidation(i);
                if (!_results.isValid)
                    _isValid = false;
            }
        } else if (this._formInputEle.length > index) {
            _checkValidation(index);
            if (!_results.isValid)
                _isValid = false;
        }

        return _isValid;
    }

    get formInput () {
        return this._formInputEle;
    }

    get value () {
        let _inputEle,
            _value = [],
            _valueKey;

        for (let i = 0; i < this._formInputEle.length; i++) {
            _inputEle = this._formInputEle[i].querySelectorAll(`.${this._inputClass}`);
            _value.push(null);

            if (_inputEle.length === 1)
                _value[i] = this._getValue(_inputEle[0]);
            else if (_inputEle.length > 1) {
                _value[i] = {};

                for (let j = 0; j < _inputEle.length; j++) {
                    if (_inputEle[j].dataset.valueKey)
                        _valueKey = _inputEle[j].dataset.valueKey;
                    else if (_inputEle[j].name !== null && _inputEle[j].name !== '')
                        _valueKey = _inputEle[j].name;
                    else
                        _valueKey = _inputEle[j].id;
                    
                    if (_inputEle[j].type === 'checkbox') {
                        if (!Array.isArray(_value[i][_valueKey]))
                            _value[i][_valueKey] = [];
                        if (this._getValue(_inputEle[j]) === true)
                            _value[i][_valueKey].push(_inputEle[j].value);
                    } else if (_inputEle[j].type === 'radio') {
                        if (this._getValue(_inputEle[j]) === true)
                            _value[i][_valueKey] = _inputEle[j].value;
                        else if (typeof _value[i][_valueKey] === 'undefined')
                            _value[i][_valueKey] = false;
                    } else
                        _value[i][_valueKey] = this._getValue(_inputEle[j]);
                }
            }
        }

        return _value;
    }
}
