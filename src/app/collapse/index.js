import 'object/object.property';
import 'element/element.property';
import component from 'component';

// collapse
export default class Collapse extends component {
    constructor (options = {}) {
        super(options);

        this._options = Object.assign({
            ele: '.collapse',
            btn: '.collapse__button',
            item: '.collapse__item',
            expandClass: 'collapse__item--expand',
            btnActiveClass: 'active',
            animationClass: 'collapse--animation',
            playAnimationClass: 'collapse--animation--play',
            endAnimationClass: 'collapse--animation--end',
            expandAnimationClass: 'collapse--animation--expand',
            collapseAnimationClass: 'collapse--animation--collapse',
            events: {}
        }, options);

        this._collapseGroup = [];
        this._collapseItem = [];
        this._collapseBtn = [];
        this._collapseId = [];

        this._init();
    }

    _init () {
        let _group = document.querySelectorAll(this._options.ele),
            _item = document.querySelectorAll(this._options.item),
            _btn = document.querySelectorAll(this._options.btn),
            _self = this,
            _child = [],
            _expandId = [];

        // Function from David Walsh: http://davidwalsh.name/css-animation-callback
        let whichTransitionEvent = function () {
            let t;
            let el = document.createElement('fakeelement');
            let transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };

            for (t in transitions) {
                if (el.style[t] !== undefined)
                    return transitions[t];
            }
        };
        let transitionEvent = whichTransitionEvent();

        /*----------  get options from dataset  ----------*/
        this.datasetOptions(document.querySelectorAll(`${this._options.ele}, ${this._options.item}, ${this._options.btn}`), 'collapse', true);

        /*----------  init collapse group  ----------*/
        for (let i = 0; i < _group.length; i++) {
            _group[i].collapse.id = i;
            _group[i].collapse.items = _group[i].querySelectorAll(this._options.item);
            _group[i].collapse.btns = _group[i].querySelectorAll(this._options.btn);
            if (typeof _group[i].collapse.accordion === 'undefined')
                _group[i].collapse.accordion = this._options.accordion === true;

            _child = _group[i].querySelectorAll(`${this._options.item}, ${this._options.btn}`);

            for (let j = 0; j < _child.length; j++) {
                _child[j].collapse.groupId = i;

                if (_child[j].querySelectorAll('.collapse__animation').length > 0)
                    _child[j].addClass(this._options.animationClass);
                else
                    _child[j].removeClass(this._options.animationClass);

                // add event listener detect css animation
                transitionEvent && _child[j].addEventListener(transitionEvent, function () {
                    if (this.hasClass(_self._options.animationClass)) {
                        if (this.hasClass(_self._options.expandAnimationClass)) {
                            this.removeClass(_self._options.expandAnimationClass);
                            this.addClass(_self._options.expandClass);
                            this.addClass(_self._options.endAnimationClass);
                            if (typeof _self._options.events.afterExpand === 'function')
                                _self._options.events.afterExpand();
                        } else if (this.hasClass(_self._options.collapseAnimationClass)) {
                            this.removeClass(_self._options.collapseAnimationClass);
                            this.removeClass(_self._options.expandClass);
                            if (typeof _self._options.events.beforeCollapse === 'function')
                                _self._options.events.afterCollapse();
                        }

                        if (this.hasClass('collapse__item--height'))
                            this.querySelector('.collapse__animation').style.height = '';
                    }
                });
            }

            this._collapseGroup.push(_group[i]);
        }

        /*----------  init collapse items  ----------*/
        for (let k = 0; k < _item.length; k++) {
            if (this._collapseId.indexOf(_item[k].collapse.id) === -1)
                this._collapseId.push(_item[k].collapse.id);

            if (typeof _item[k].collapse.groupId !== 'number')
                _item[k].collapse.groupId = -1;

            if (_item[k].hasClass(this._options.expandClass) && _expandId.indexOf(_item[k].collapse.id) === -1)
                _expandId.push(_item[k].collapse.id);

            this._collapseItem.push(_item[k]);
        }

        /*----------  init collapse button  ----------*/
        for (let l = 0; l < _btn.length; l++) {
            _btn[l].onclick = function (event) {
                let _target = this.collapse.target;

                if (typeof _target === 'string' & _target !== '') {
                    if (this.hasClass(_self._options.btnActiveClass))
                        _self.expand(_target, false, this.collapse.groupId);
                    else
                        _self.expand(_target, true, this.collapse.groupId);
                }

                if (typeof _self._options.events.buttonClick === 'function')
                    _self._options.events.buttonClick();
            };

            if (typeof _btn[l].collapse.groupId !== 'number')
                _btn[l].collapse.groupId = -1;

            if (_btn[l].hasClass(this._options.btnActiveClass) && _expandId.indexOf(_btn[l].collapse.target) === -1)
                _expandId.push(_btn[l].collapse.target);

            this._collapseBtn.push(_btn[l]);
        }

        // this.expand(_expandId);

        return this._collapseId;
    }

    expand (collapseId, expand = true, groupId = -1) {
        let _collapseId = Array.isArray(collapseId) ? collapseId : (typeof collapseId === 'string' && collapseId !== '' ? [collapseId] : []),
            _item = _collapseId.length > 0 ? this._collapseItem.filter(item => _collapseId.indexOf(item.collapse.id) !== -1) : this._collapseItem,
            _btn,
            _height,
            _width;

        if (groupId !== -1)
            _item = _item.filter(item => item.collapse.groupId === groupId);

        for (let i = 0; i < _item.length; i++) {
            if (expand === true) {
                console.log(this._collapseGroup[_item[i].collapse.groupId].collapse);
                if (this._collapseGroup[_item[i].collapse.groupId].collapse.accordion === true)
                    this.expand(this.getExpandItemsId(_item[i].collapse.groupId), false, _item[i].collapse.groupId);
                if (typeof this._options.events.beforeExpand === 'function')
                    this._options.events.beforeExpand();

                _item[i].addClass(this._options.expandClass);

                if (_item[i].hasClass(this._options.animationClass)) {
                    _item[i].removeClass(this._options.collapseAnimationClass);

                    setTimeout(() => {
                        _height = _item[i].querySelector('.collapse__animation').offsetHeight;
                        _width = _item[i].querySelector('.collapse__animation').offsetWidth;
                        if (_height === 0) {
                            _item[i].querySelector('.collapse__animation').style.height = `${_item[i].querySelector('.collapse__item__wrapper').offsetHeight}px`;
                            _item[i].addClass('collapse__item--height');
                        }
                        if (_width === 0)
                            _item[i].addClass('collapse__item--width');
                        _item[i].addClass(this._options.playAnimationClass);
                        _item[i].addClass(this._options.expandAnimationClass);
                    }, 1);
                } else {
                    if (typeof this._options.events.afterExpand === 'function')
                        this._options.events.afterExpand();
                }
            } else {
                if (typeof this._options.events.beforeCollapse === 'function')
                    this._options.events.beforeCollapse();
                if (_item[i].hasClass(this._options.animationClass)) {
                    if (_item[i].hasClass('collapse__item--height'))
                        _item[i].querySelector('.collapse__animation').style.height = `${_item[i].querySelector('.collapse__item__wrapper').offsetHeight}px`;
                    _item[i].removeClass(this._options.endAnimationClass);
                    _item[i].removeClass(this._options.playAnimationClass);
                    _item[i].removeClass(this._options.expandAnimationClass);
                    _item[i].addClass(this._options.collapseAnimationClass);
                    if (_item[i].hasClass('collapse__item--height') || _item[i].hasClass('collapse__item--width')) {
                        setTimeout(() => {
                            if (_item[i].hasClass('collapse__item--height') && !_item[i].hasClass('collapse__item--width'))
                                _item[i].querySelector('.collapse__animation').style.height = '0';
                        }, 1);
                    }
                } else {
                    _item[i].removeClass(this._options.expandClass);
                    if (typeof this._options.events.afterCollapse === 'function')
                        this._options.events.afterCollapse();
                }
            }

            _btn = this._collapseBtn.filter(btn => btn.collapse.target === _item[i].collapse.id && btn.collapse.groupId === _item[i].collapse.groupId);

            for (let j = 0; j < _btn.length; j++) {
                if (expand === true)
                    _btn[j].addClass(this._options.btnActiveClass);
                else
                    _btn[j].removeClass(this._options.btnActiveClass);
            }
        }

        return _item;
    }

    getExpandItemsId (groupId = -1) {
        let _items = groupId === -1 ? this._collapseItem : this._collapseItem.filter(item => item.collapse.groupId === groupId),
            _expandItems = [];

        for (let i = 0; i < _items.length; i++) {
            if (_items[i].hasClass(this._options.expandClass))
                _expandItems.push(this._collapseItem[i].collapse.id);
        }

        return _expandItems;
    }

    get collapse () { return this._collapseGroup; }

    get items () { return this._collapseItem; }

    get buttons () { return this._collapseBtn; }

    get collapseId () { return this._collapseId; }
}
