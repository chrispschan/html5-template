import 'object/object.property';
import 'element/element.property';

// social media share link without SDK
export default class SocialMedia {
    constructor (options = {}) {
        this._social = {
            buffer: {   // buffer
                url: 'https://bufferapp.com/add',
                href: 'url',
                key: [
                    'text'
                ]
            },
            digg: {   // digg
                url: 'http://www.digg.com/submit',
                href: 'url',
                key: [
                    'text'
                ]
            },
            facebook: {    // facebook
                url: 'https://www.facebook.com/sharer/sharer.php',
                href: 'u'
            },
            google: {   // google+
                url: 'https://plus.google.com/share',
                href: 'url'
            },
            line: {   // line
                url: 'https://social-plugins.line.me/lineit/share',
                href: 'url'
            },
            linkedIn: {   // linkedIn
                url: 'http://www.linkedin.com/shareArticle',
                href: 'url',
                key: [
                    'mini'
                ]
            },
            reddit: {   // reddit
                url: 'http://reddit.com/submit',
                href: 'url',
                key: [
                    'title'
                ]
            },
            stumbleUpon: {   // stumbleUpon
                url: 'http://www.stumbleupon.com/submit',
                href: 'url',
                key: [
                    'title'
                ]
            },
            tumblr: {   // tumblr
                url: 'http://www.tumblr.com/share/link',
                href: 'url',
                key: [
                    'title'
                ]
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
            vk: {    // vk
                url: 'http://vkontakte.ru/share.php',
                href: 'url'
            },
            whatsapp: {    // whatsapp
                url: 'https://wa.me/',
                href: 'text'
            },
            yummly: {    // yummly
                url: 'http://www.yummly.com/urb/verify',
                href: 'url',
                key: [
                    'title'
                ]
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

            /*----------  share url  ----------*/
            if (_selfOptions.href === '#' && _ele[i].href) _selfOptions.href = _ele[i].href;

            /*----------  self options from dataset  ----------*/
            if (typeof _ele[i].dataset === 'object') {
                for (let key in _ele[i].dataset) {
                    if (key === 'popup')    // true/false value
                        _selfOptions[key] = _ele[i].dataset[key] === 'true';
                    else
                        _selfOptions[key] = _ele[i].dataset[key];
                }
            }

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
