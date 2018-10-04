import 'object/object.property';
import 'element/element.property';

// social media share link without SDK
export default class SocialMedia {
    constructor (options = {}) {
        this._social = {
            facebook: {    // facebook
                url: 'https://www.facebook.com/sharer/sharer.php',
                href: 'u'
            },
            twitter: {    // twitter
                url: 'https://twitter.com/share',
                href: 'url',
                key: [
                    'via',
                    'related',
                    'hashtags',
                    'text'
                ]
            },
            whatsapp: {    // whatsapp
                url: 'https://wa.me/',
                href: 'text'
            },
            other: {    // other - call https://www.addtoany.com/
                url: 'https://www.addtoany.com/add_to/',
                href: 'linkurl'
            }
        };

        this._socialMediaEle = [];

        this._options = Object.assign({
            href: '#',
            popup: false
        }, options);

        if (options.ele && options.ele !== '') this.addSocialMedia(options.ele);
    }

    addSocialMedia (ele = '.socialMedia', options = {}) {
        let _options = Object.assign(this._options, options),
            _ele = document.querySelectorAll(ele),
            _self = this,
            _selfOptions = {};

        for (let i = 0; i < _ele.length; i++) {
            _selfOptions = Object.assign({}, _options);

            _ele[i].getDataset();

            /*----------  common  ----------*/
            if (_selfOptions.href === '#' && _ele[i].href) _selfOptions.href = _ele[i].href;
            if (_ele[i].dataset.type) _selfOptions.type = _ele[i].dataset.type;
            if (_ele[i].dataset.popup) _selfOptions.popup = _ele[i].dataset.popup === 'true';
            /*----------  twitter  ----------*/
            if (_ele[i].dataset.via) _selfOptions.via = _ele[i].dataset.via;
            if (_ele[i].dataset.related) _selfOptions.related = _ele[i].dataset.related;
            if (_ele[i].dataset.hashtags) _selfOptions.hashtags = _ele[i].dataset.hashtags;
            if (_ele[i].dataset.text) _selfOptions.text = _ele[i].dataset.text;

            // share window.location.href when without href
            if (_selfOptions.href === '#' || _selfOptions.href === 'javascript:;')
                _selfOptions.href = window.location.href;

            // set type to 'other' if type not valid
            if (typeof this._social[_selfOptions.type] === 'undefined') {
                _selfOptions.subType = _selfOptions.type;
                _selfOptions.type = 'other';
            }

            // mix share link
            _selfOptions.shareLink = `${this._social[_selfOptions.type].url}${_selfOptions.type === 'other' ? _selfOptions.subType : ''}?${this._social[_selfOptions.type].href}=${encodeURIComponent(_selfOptions.href)}`;
            if (Array.isArray(this._social[_selfOptions.type].key)) {
                for (let i = 0; i < this._social[_selfOptions.type].key.length; i++) {
                    if (typeof _selfOptions[this._social[_selfOptions.type].key[i]] !== 'undefined' && _selfOptions[this._social[_selfOptions.type].key[i]] !== '')
                        _selfOptions.shareLink += `&${this._social[_selfOptions.type].key[i]}=${encodeURIComponent(_selfOptions[this._social[_selfOptions.type].key[i]])}`;
                }
            }

            _ele[i].socialMediaOptions = Object.assign({}, _selfOptions);

            _ele[i].onclick = function (event) {
                event.preventDefault();
                let _options = Object.assign(_self._options, this.socialMediaOptions);

                if (_options.popup)
                    window.open(_options.shareLink, 'socialMedia', 'width=600, height=400, scrollbars=no');
                else
                    window.open(_options.shareLink, '_blank');

                return true;
            };

            this._socialMediaEle.push(_ele[i]);
        }

        return this._socialMediaEle;
    }

    get socialMedia () { return this._socialMediaEle; }
}
