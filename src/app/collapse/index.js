import 'object/object.property';
import 'element/element.property';
import component from 'component';

// collapse
export default class Collapse extends component {
    constructor (options = {}) {
        super(options);

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

        this._animation = {
            class: 'collapse--animation',
            play: 'collapse--animation--play',
            end: 'collapse--animation--end',
            expand: 'collapse--animation--expand',
            collapse: 'collapse--animation--collapse',
            transitionEvent: whichTransitionEvent()
        };

        this._options = Object.assign({
            ele: '.collapse',
            btn: '.collapse__button',
            item: '.collapse__item',
            animationClass: 'collapse__animation',
            expandClass: 'collapse__item--expand',
            btnActiveClass: 'active',
            waitAnimation: 1000,    // end animation when animation not end after this time
            events: {}
        }, options);

        this._init();
    }

    _init () {
        let _group = document.querySelectorAll(this._options.ele),
            _item = document.querySelectorAll(this._options.item),
            _btn = document.querySelectorAll(this._options.btn),
            _index,
            _child = [],
            _expandId = [];

        this._collapseGroup = [];
        this._collapseItem = [];
        this._collapseBtn = [];
        this._collapseId = [];

        /*----------  get options from dataset  ----------*/
        this.datasetOptions(document.querySelectorAll(`${this._options.ele}, ${this._options.item}, ${this._options.btn}`), 'collapse', true);

        /*----------  init collapse group  ----------*/
        for (_index = 0; _index < _group.length; _index++) {
            _group[_index].collapse.id = _index;

            // self options
            _group[_index].collapse = Object.assign({
                accordion: this._options.accordion === true
            }, _group[_index].collapse);

            _child = _group[_index].querySelectorAll(`${this._options.item}, ${this._options.btn}`);

            for (let i = 0; i < _child.length; i++)
                _child[i].collapse.groupId = _index;

            this._collapseGroup.push(_group[_index]);
        }

        /*----------  init collapse items  ----------*/
        for (_index = 0; _index < _item.length; _index++) {
            this._itemInit(_item[_index]);

            // check expand
            if (_item[_index].hasClass(this._options.expandClass) && _expandId.indexOf(_item[_index].collapse.id) === -1)
                _expandId.push(_item[_index].collapse.id);

            this._collapseItem.push(_item[_index]);
        }

        /*----------  init collapse buttons  ----------*/
        for (_index = 0; _index < _btn.length; _index++) {
            this._buttonInit(_btn[_index]);

            // check expand
            if (_btn[_index].hasClass(this._options.btnActiveClass) && _expandId.indexOf(_btn[_index].collapse.target) === -1)
                _expandId.push(_btn[_index].collapse.target);

            this._collapseBtn.push(_btn[_index]);
        }

        /*----------  default expand  ----------*/
        if (_expandId.length > 0)
            this.expand(_expandId);

        return this._collapseId;
    }

    _itemInit (item) {
        /*----------  if new collapse id  ----------*/
        if (this._collapseId.indexOf(item.collapse.id) === -1)
            this._collapseId.push(item.collapse.id);

        /*----------  has animation  ----------*/
        if (item.querySelectorAll(`.${this._options.animationClass}`).length > 0)
            this._animationInit(item);
        else
            item.removeClass(this._options.animationClass);

        /*----------  reset group id if undefined  ----------*/
        if (typeof item.collapse.groupId !== 'number')
            item.collapse.groupId = -1;
    }

    _buttonInit (btn) {
        let _self = this,
            _expand = function (event) {
                let _target = this.collapse.target;

                if (_self.getExpandItemsId(this.collapse.groupId).indexOf(this.collapse.target) === -1)
                    _self.expand(_target, true, this.collapse.groupId);

                if (typeof _self._options.events.buttonClick === 'function')
                    _self._options.events.buttonClick();
            },
            _collapse = function (event) {
                let _target = this.collapse.target;

                if (_self.getExpandItemsId(this.collapse.groupId).indexOf(this.collapse.target) !== -1)
                    _self.expand(_target, false, this.collapse.groupId);

                if (typeof _self._options.events.buttonClick === 'function')
                    _self._options.events.buttonClick();
            },
            _toggle = function (event) {
                let _target = this.collapse.target;

                if (typeof _target === 'string' & _target !== '') {
                    if (_self.getExpandItemsId(this.collapse.groupId).indexOf(this.collapse.target) !== -1)
                        _self.expand(_target, false, this.collapse.groupId);
                    else
                        _self.expand(_target, true, this.collapse.groupId);
                }

                if (typeof _self._options.events.buttonClick === 'function')
                    _self._options.events.buttonClick();
            };

        /*----------  add click event by type  ----------*/
        switch (btn.collapse.type) {
            case 'expand':    // only expand
                btn.onclick = _expand;
                break;
            case 'collapse':    // only collapse
                btn.onclick = _collapse;
                break;
            case 'hover':    // hover expand
                btn.onmouseenter = _expand;
                btn.onmouseleave = _collapse;
                break;
            case 'focus':    // only expand
                btn.onfocus = _expand;
                break;
            case 'disable':
                btn.onclick = null;
                btn.onmouseenter = null;
                btn.onmouseleave = null;
                btn.onfocus = null;
                break;
            default:    // toggle
                btn.onclick = _toggle;
                break;
        }

        /*----------  reset group id if undefined  ----------*/
        if (typeof btn.collapse.groupId !== 'number')
            btn.collapse.groupId = -1;

        return btn;
    }

    _animationInit (item) {
        let _self = this;

        item.addClass(this._animation.class);
        item.collapse.animationTimeout = null;

        /*----------  add event listener detect css animation  ----------*/
        this._animation.transitionEvent && item.addEventListener(this._animation.transitionEvent, function () {
            _self._animationEnd(this);
        });

        return item;
    }

    _animationEnd (item) {
        if (item.hasClass(this._animation.class)) {
            /*----------  clear animation timeout  ----------*/
            if (item.collapse.animationTimeout !== null)
                clearTimeout(item.collapse.animationTimeout);

            if (item.hasClass(this._animation.expand)) {   // end of expand animation end
                item.removeClass(this._animation.expand);
                item.addClass(this._options.expandClass);
                item.addClass(this._animation.end);

                /*----------  after expand function  ----------*/
                if (typeof this._options.events.afterExpand === 'function')
                    this._options.events.afterExpand();
            } else if (item.hasClass(this._animation.collapse)) {  // end of collapse animation
                item.removeClass(this._animation.collapse);
                item.removeClass(this._options.expandClass);

                /*----------  after collapse function  ----------*/
                if (typeof this._options.events.afterCollapse === 'function')
                    this._options.events.afterCollapse();
            }

            // reset elemaent height to auto
            if (item.hasClass('collapse__item--height'))
                item.querySelector(`.${this._options.animationClass}`).style.height = '';
        }
    }

    expand (collapseId, expand = true, groupId = -1) {
        let _collapseId = Array.isArray(collapseId) ? collapseId : (typeof collapseId === 'string' && collapseId !== '' ? [collapseId] : []),
            _item = _collapseId.length > 0 ? this._collapseItem.filter(item => _collapseId.indexOf(item.collapse.id) !== -1) : this._collapseItem,
            _btn,
            _options;

        if (groupId !== -1)
            _item = _item.filter(item => item.collapse.groupId === groupId);

        for (let i = 0; i < _item.length; i++) {
            _options = _item[i].collapse;

            if (expand === true && this.getExpandItemsId(_options.groupId).indexOf(_options.id) === -1) {  // expand
                /*----------  collapse other item if accordion  ----------*/
                if (groupId !== -1) {
                    if (this._collapseGroup[_options.groupId].collapse.accordion === true && this.getExpandItemsId(_options.groupId).length > 0)
                        this.expand(this.getExpandItemsId(_options.groupId), false, _options.groupId);
                }

                _item[i].collapse.expand = true;
                
                /*----------  before expand function  ----------*/
                if (typeof this._options.events.beforeExpand === 'function')
                    this._options.events.beforeExpand();

                _item[i].addClass(this._options.expandClass);

                /*----------  has animation  ----------*/
                if (_item[i].hasClass(this._animation.class))
                    this._animationExpane(_item[i]);
                else if (typeof this._options.events.afterExpand === 'function')    // without animation
                    /*----------  after expand function  ----------*/
                    this._options.events.afterExpand();
            } else if (expand !== true && this.getExpandItemsId(_options.groupId).indexOf(_options.id) !== -1) {    // collapse
                _item[i].collapse.expand = false;

                /*----------  before collapse function  ----------*/
                if (typeof this._options.events.beforeCollapse === 'function')
                    this._options.events.beforeCollapse();

                /*----------  has animation  ----------*/
                if (_item[i].hasClass(this._animation.class))
                    this._animationCollapse(_item[i]);
                else {  // without animation
                    _item[i].removeClass(this._options.expandClass);

                    /*----------  after collapse function  ----------*/
                    if (typeof this._options.events.afterCollapse === 'function')
                        this._options.events.afterCollapse();
                }
            }

            _btn = this._collapseBtn.filter(btn => btn.collapse.target === _options.id && btn.collapse.groupId === _options.groupId);

            /*----------  set button state  ----------*/
            for (let j = 0; j < _btn.length; j++) {
                if (expand === true)    // expand
                    _btn[j].addClass(this._options.btnActiveClass);
                else    // collapse
                    _btn[j].removeClass(this._options.btnActiveClass);
            }
        }

        return _item;
    }

    _animationExpane (item) {
        let _height,
            _width,
            _self = this;

        /*----------  reset animation timeout  ----------*/
        if (item.collapse.animationTimeout !== null)
            clearTimeout(item.collapse.animationTimeout);
        item.collapse.animationTimeout = setTimeout(function () {
            _self._animationEnd(item);
        }, this._options.waitAnimation);

        item.removeClass(this._animation.collapse);

        setTimeout(() => {  // wait class css append
            _height = item.querySelector(`.${this._options.animationClass}`).offsetHeight;
            _width = item.querySelector(`.${this._options.animationClass}`).offsetWidth;

            if (_height === 0) {    // cannot get height: auto
                item.querySelector(`.${this._options.animationClass}`).style.height = `${item.querySelector('.collapse__item__wrapper').offsetHeight}px`;
                item.addClass('collapse__item--height');
            }

            if (_width === 0)   // cannot get width: auto
                item.addClass('collapse__item--width');

            item.addClass(this._animation.play);
            item.addClass(this._animation.expand);
        }, 1);
    }

    _animationCollapse (item) {
        let _self = this;

        /*----------  reset animation timeout  ----------*/
        if (item.collapse.animationTimeout !== null)
            clearTimeout(item.collapse.animationTimeout);
        item.collapse.animationTimeout = setTimeout(function () {
            _self._animationEnd(item);
        }, this._options.waitAnimation);

        /*----------  set animation element height  ----------*/
        if (item.hasClass('collapse__item--height'))
            item.querySelector(`.${this._options.animationClass}`).style.height = `${item.querySelector('.collapse__item__wrapper').offsetHeight}px`;
        
        item.removeClass(this._animation.end);
        item.removeClass(this._animation.play);
        item.removeClass(this._animation.expand);
        item.addClass(this._animation.collapse);

        /*----------  set animation element height to 0  ----------*/
        if (item.hasClass('collapse__item--height') || item.hasClass('collapse__item--width')) {
            setTimeout(() => {  // wait class css append
                if (item.hasClass('collapse__item--height') && !item.hasClass('collapse__item--width'))
                    item.querySelector(`.${this._options.animationClass}`).style.height = '0';
            }, 1);
        }
    }

    getExpandItemsId (groupId = -1) {
        let _items = groupId === -1 ? this._collapseItem : this._collapseItem.filter(item => item.collapse.groupId === groupId),
            _expandItems = [];

        for (let i = 0; i < _items.length; i++) {
            if (_items[i].collapse.expand === true)
                _expandItems.push(_items[i].collapse.id);
        }

        return _expandItems;
    }

    get collapse () { return this._collapseGroup; }

    get items () { return this._collapseItem; }

    get buttons () { return this._collapseBtn; }

    get collapseId () { return this._collapseId; }
}
