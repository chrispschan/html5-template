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

        this._options = Object.assign({
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
            href: 'javascript:;',
            deepLink: null,
            store: null,
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
        let _options = Object.assign(this._options, options),
            _ele = document.querySelectorAll(ele),
            _self = this,
            _selfOptions = {};

        if (this._os !== 'other') {
            for (let i = 0; i < _ele.length; i++) {
                _selfOptions = Object.assign({}, _options);

                Element.getDataset(_ele[i].dataset);

                if (_ele[i].dataset.deepLink) _selfOptions.deepLink = _ele[i].dataset.deepLink;
                if (_ele[i].dataset.appName) _selfOptions.appName = _ele[i].dataset.appName;
                if (_ele[i].dataset.androidId) _selfOptions.android.id = _ele[i].dataset.androidId;
                if (_ele[i].dataset.androidLink) _selfOptions.android.deepLink = _ele[i].dataset.androidLink;
                if (_ele[i].dataset.iosId) _selfOptions.ios.id = _ele[i].dataset.iosId;
                if (_ele[i].dataset.iosLink) _selfOptions.ios.deepLink = _ele[i].dataset.iosLink;
                if (_ele[i].dataset.windowsId) _selfOptions.windows.id = _ele[i].dataset.windowsId;
                if (_ele[i].dataset.windowsLink) _selfOptions.windows.deepLink = _ele[i].dataset.windowsLink;

                if (_selfOptions[this._os].support) {
                    if (_selfOptions[this._os].deepLink) _selfOptions.deepLink = _selfOptions[this._os].deepLink;

                    _selfOptions.store = this._getStore(_selfOptions);

                    _ele[i].deepLinkOptions = Object.assign({}, _selfOptions);

                    _ele[i].onclick = function (event) {
                        event.preventDefault();
                        event.stopImmediatePropagation();

                        _self.call(this.deepLinkOptions);

                        return true;
                    };

                    console.log(_ele[i].onclick);

                    this._deepLinkEle.push(_ele[i]);
                }
            }
        }

        return this._deepLinkEle;
    }

    call (options = {}, onLoadOpen = false) {
        let _options = Object.assign(this._options, options),
            _delay = onLoadOpen && this._os === 'android' ? 500 : 0;

        if (!_options.store) _options.store = this._getStore(_options);

        if (!_options[this._os].support) _options[this._os].support = this._options[this._os].support;

        return setTimeout(() => {
            let _start = new Date().getTime();
            if (_options[this._os].support) {
                if (_options.deepLink != null) {
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
