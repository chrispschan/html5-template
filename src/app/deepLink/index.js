import 'object/object.property';
import 'element/element.property';

// deep link
export default class DeepLink {
    constructor (options = {}) {
        this._devices = {
            windows: {    // window phone
                store: 'zune:navigate?appid=',
                userAgent: /Windows\s+Phone|IEMobile/i
            },
            android: {    // android system
                store: 'market://details?id=',
                userAgent: /Android/i
            },
            ios: {    // ios
                store: 'itms-apps://itunes.apple.com/hk/app/',
                userAgent: /iPhone|iPad|iPod/i
            }
        };

        this._os = this._getUserAgent();

        this._deepLinkEle = [];

        this._options = Object.deepAssign({
            delay: 300,
            windows: {
                support: false
            },
            android: {
                support: true
            },
            ios: {
                support: true
            },
            appName: ''
        }, options);

        if (options.ele && options.ele !== '') this.addDeepLink(options.ele);
    }

    _getUserAgent () {
        for (let key in this._devices)
            if (navigator.userAgent.match(this._devices[key].userAgent)) return key;

        return 'other';
    }

    _getStore (options = {}) {
        let _store = this._devices[this._os];

        if (options[this._os].id) {
            switch (this._os) {
                case 'ios':
                    if (options.appName !== '')
                        _store = this._devices.ios.store + options.appName + '/id' + options.ios.id;
                    else
                        _store = this._devices.ios.store + options.ios.id;
                    break;
                case 'windows':
                case 'android':
                default:
                    _store = this._devices[this._os].store + options[this._os].id;
                    break;
            }
        } else _store = options.href ? options.href : 'javascript:;';

        return _store;
    }

    addDeepLink (ele = '.deepLink', options = {}) {
        let _options = Object.deepAssign(this._options, options),
            _ele = document.querySelectorAll(ele),
            _self = this,
            _selfOptions = {};

        if (this._os !== 'other') {
            for (let i = 0; i < _ele.length; i++) {
                _selfOptions = Object.deepAssign({}, _options);

                _ele[i].getDataset();

                /*----------  href  ----------*/
                if (!_selfOptions.href && _ele[i].href) _selfOptions.href = _ele[i].href;

                /*----------  self options from dataset  ----------*/
                if (typeof _ele[i].dataset === 'object') {
                    for (let key in _ele[i].dataset) {
                        switch (key) {
                            case 'androidId':
                            case 'iosId':
                            case 'windowsId':
                                _selfOptions[key.replace('Id', '')].id = _ele[i].dataset[key];
                                break;
                            case 'androidLink':
                            case 'iosLink':
                            case 'windowsLink':
                                _selfOptions[key.replace('Link', '')].deepLink = _ele[i].dataset[key];
                                break;
                            default:
                                _selfOptions[key] = _ele[i].dataset[key];
                                break;
                        }
                    }
                }

                if (_selfOptions[this._os].support) {
                    if (_selfOptions[this._os].deepLink) _selfOptions.deepLink = _selfOptions[this._os].deepLink;

                    _selfOptions.store = this._getStore(_selfOptions);

                    _ele[i].deepLinkOptions = Object.deepAssign({}, _selfOptions);

                    _ele[i].onclick = function (event) {
                        event.preventDefault();
                        event.stopImmediatePropagation();

                        _self.call(this.deepLinkOptions);

                        return true;
                    };

                    this._deepLinkEle.push(_ele[i]);
                }
            }
        }

        return this._deepLinkEle;
    }

    call (options = {}, onLoadOpen = false) {
        let _options = Object.deepAssign(this._options, options),
            _delay = onLoadOpen && this._os === 'android' ? 500 : 0;

        if (!_options.store) _options.store = this._getStore(_options);

        if (!_options[this._os].support) _options[this._os].support = this._options[this._os].support;

        return setTimeout(() => {
            let _start = new Date().getTime();
            if (_options[this._os].support) {
                if (_options.deepLink) {
                    let _timeout = setTimeout(() => {
                        // Get current time
                        let _now = new Date().getTime();

                        // clear timeout
                        clearTimeout(_timeout);

                        // Has the user left the screen? ABORT!
                        if (_now - _start >= _options.delay * 2) return;

                        // Open store or original link
                        window.location = _options.store;
                    }, _options.delay);

                    // try open deep link
                    window.location = _options.deepLink;
                } else window.location = _options.store;
            } else window.location = _options.href;
        }, _delay);
    }

    get os () { return this._os; }

    get deepLink () { return this._deepLinkEle; }
}
