import 'object/object.property';
import 'element/element.property';

// collapse
export default class Collapse {
    constructor (options = {}) {
        this._options = Object.assign({
            ele: '.collapse',
            btn: '.collapse__button',
            wrapper: '.collapse__wrapper',
            item: '.collapse__item'
        }, options);

        this._collapseItem = [];
        this._collapseBtn = [];
        this._collapseId = [];

        this._init();
    }

    _init () {
        let _item = document.querySelectorAll(this._options.item),
            _btn = document.querySelectorAll(this._options.btn),
            _self = this;

        for (let i = 0; i < _item.length; i++) {
            _item[i].getDataset();

            _item[i].collapseId = _item[i].dataset.collapseId;

            if (this._collapseId.indexOf(_item[i].collapseId) === -1)
                this._collapseId.push(_item[i].collapseId);

            this._collapseItem.push(_item[i]);
        }

        for (let j = 0; j < _btn.length; j++) {
            _btn[j].onclick = function (event) {
                let _target = this.getAttribute('data-collapse-target');

                if (typeof _target === 'string' & _target !== '') {
                    if (this.hasClass('active')) {
                        _self.collapse(_target);
                        this.removeClass('active');
                    } else {
                        _self.expand(_target);
                        this.addClass('active');
                    }
                }
            };

            this._collapseBtn.push(_btn[j]);
        }

        return this._collapseId;
    }

    expand (collapseId) {
        let _collapseId = Array.isArray(collapseId) ? collapseId : (typeof collapseId === 'string' && collapseId !== '' ? [collapseId] : []),
            _item = _collapseId.length > 0 ? this._collapseItem.filter(item => _collapseId.indexOf(item.collapseId) !== -1) : this._collapseItem,
            _btn;

        for (let i = 0; i < _item.length; i++) {
            _item[i].addClass('collapse__item--expand');

            _btn = this._collapseBtn.filter(btn => btn.getAttribute('data-collapse-target') === item.collapseId);

            for (let j = 0; j < _btn.length; j++)
                _btn[i].addClass('active');
        }

        return _item;
    }

    collapse (collapseId) {
        let _collapseId = Array.isArray(collapseId) ? collapseId : (typeof collapseId === 'string' && collapseId !== '' ? [collapseId] : []),
            _item = _collapseId.length > 0 ? this._collapseItem.filter(item => _collapseId.indexOf(item.collapseId) !== -1) : this._collapseItem,
            _btn;

        for (let i = 0; i < _item.length; i++) {
            _item[i].removeClass('collapse__item--expand');

            _btn = this._collapseBtn.filter(btn => btn.getAttribute('data-collapse-target') === item.collapseId);

            for (let j = 0; j < _btn.length; j++)
                _btn[i].removeClass('active');
        }

        return _item;
    }
}
