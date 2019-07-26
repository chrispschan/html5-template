import 'object/object.property';
import 'element/element.property';
import MutationObserver from 'mutationObserver';
import ScrollTo from 'scrollTo';

export default class Scrollbar {
    constructor (scrollbar = '.scrollbar', options = {}) {
        this._options = Object.deepAssign({
            disabledX: false,
            disabledY: false
        }, options);

        this._scrollbarEle = document.querySelectorAll(scrollbar);
        this._userAgent = /iPhone|iPad|iPod/i;    // fix ios native scrollbar
        this._isMobile = navigator.userAgent.match(this._userAgent) !== null;
        this._mousedownTimer = null;
        this._isMouseDown = false;
        this._dragScrollbar = null;
        this._dragPos = 0;
        
        this._initScrollbar(this);
    }

    _initScrollbar (self) {
        let _options = {};

        for (let i = 0; i < self._scrollbarEle.length; i++) {
            _options = Object.deepAssign({ index: i }, self._options);

            self._scrollbarEle[i].getDataset();
            self._scrollbarEle[i].scrollbarOptions = _options;

            /*----------  self options from dataset  ----------*/
            if (typeof self._scrollbarEle[i].dataset === 'object') {
                for (let key in self._scrollbarEle[i].dataset) {
                    switch (key) {
                        case 'disabledX':   // true/false value
                        case 'disabledY':
                            self._scrollbarEle[i].scrollbarOptions[key] = self._scrollbarEle[i].dataset[key] === 'true';
                            break;
                        default:
                            self._scrollbarEle[i].scrollbarOptions[key] = self._scrollbarEle[i].dataset[key];
                            break;
                    }
                }
            }

            this._cerateScrollbar(self._scrollbarEle[i]);
            this._setDisable(self._scrollbarEle[i], self._scrollbarEle[i].scrollbarOptions);
            this._checkScrollbar(self._scrollbarEle[i]);
        }

        document.isScrollbarYDrag = false;
        document.isScrollbarXDrag = false;
        document.scrollbarLastMouseY = 0;
        document.scrollbarLastMouseX = 0;
        document.scrollbarEle = null;

        window.addEventListener('load', () => {
            this.update();
        });

        window.addEventListener('resize', (event) => {
            this.update();
        });
    }

    // click scrollbar to scroll
    _mousedownScroll (scrollbarEle, mousePos) {
        let _slide,
            _wrapper,
            _pos,
            _dis,
            _dir,
            _isDisabled;

        if (this._mousedownTimer !== null)
            clearTimeout(this._mousedownTimer);

        if (scrollbarEle.hasClass('scrollbar__track')) {
            if (scrollbarEle.hasClass('scrollbar__track--y'))
                _isDisabled = scrollbarEle.parentNode.scrollbarOptions.disabledY === true;
            else
                _isDisabled = scrollbarEle.parentNode.scrollbarOptions.disabledX === true;

            if (!_isDisabled) {
                this._isMouseDown = true;
                _slide = scrollbarEle.querySelector('.scrollbar__track__slide');
                _wrapper = scrollbarEle.parentNode.querySelector('.scrollbar__wrapper');
                
                if (scrollbarEle.hasClass('scrollbar__track--y')) {
                    if (_slide.offsetTop > mousePos)
                        _dir = -1;
                    else if (_slide.offsetTop + _slide.offsetHeight < mousePos)
                        _dir = 1;
                    else {
                        this._isMouseDown = false;
                        return;
                    }

                    _dis = _slide.offsetHeight / scrollbarEle.offsetHeight * _wrapper.scrollHeight;
                    _pos = _wrapper.scrollTop + _dir * _dis;
                } else {
                    if (_slide.offsetLeft > mousePos)
                        _dir = -1;
                    else if (_slide.offsetLeft + _slide.offsetWidth < mousePos)
                        _dir = 1;
                    else {
                        this._isMouseDown = false;
                        return;
                    }

                    _dis = _slide.offsetWidth / scrollbarEle.offsetWidth * _wrapper.scrollWidth;
                    _pos = { offsetLeft: _wrapper.scrollLeft + _dir * _dis };
                }

                this.scrollTo(_pos, 0, _wrapper.parentNode.scrollbarOptions.index);

                this._mousedownTimer = setTimeout(() => {
                    this._mousedownScroll(scrollbarEle, mousePos);
                }, 400);
            }
        }
    }
    // add class to slide element
    _startDrag (mouseEvent) {
        let _scrollDir = mouseEvent.target.hasClass('scrollbar__track__slide--y') ? 'y' : 'x',
            _isDisabled = false;

        if (_scrollDir === 'y')
            _isDisabled = mouseEvent.target.parentNode.parentNode.scrollbarOptions.disabledY === true;
        else
            _isDisabled = mouseEvent.target.parentNode.parentNode.scrollbarOptions.disabledX === true;

        if (!_isDisabled) {
            this._dragScrollbar = mouseEvent.target;
            this._dragScrollbar.addClass('scrollbar__track__slide--drag');
            if (_scrollDir === 'y')
                this._dragPos = mouseEvent.offsetY;
            else
                this._dragPos = mouseEvent.offsetX;
        } else
            this._resetMouseEvent();
    }
    // drag to scroll
    _dragScroll (mouseEvent) {
        let _scrollbar,
            _wrapper,
            _area,
            _pos;

        if (this._dragScrollbar !== null) {
            _scrollbar = this._dragScrollbar.parentNode;
            _area = _scrollbar.parentNode;
            _wrapper = _area.querySelector('.scrollbar__wrapper');

            if (_scrollbar.hasClass('scrollbar__track--y'))
                _pos = (mouseEvent.pageY - _area.offsetTop - this._dragPos) / _scrollbar.offsetHeight * _wrapper.scrollHeight;
            else {
                _pos = {
                    offsetLeft: (mouseEvent.pageX - _area.offsetLeft - this._dragPos) / _scrollbar.offsetWidth * _wrapper.scrollWidth
                };
            }

            this.scrollTo(_pos, 0, _area.scrollbarOptions.index);
        }
    }
    _resetMouseEvent () {
        if (this._mousedownTimer !== null)
            clearTimeout(this._mousedownTimer);
        this._isMouseDown = false;

        if (this._dragScrollbar !== null) {
            this._dragScrollbar.removeClass('scrollbar__track__slide--drag');
            this._dragScrollbar = null;
        }
        
        this._dragPos = 0;
    }

    _cerateScrollbar (ele) {
        let _observer,
            _children = ele.children,
            _wrapperEle = document.createElement('DIV'),
            _contentEle = document.createElement('DIV'),
            _scrollbarXEle = document.createElement('DIV'),
            _scrollbarXSlide = document.createElement('DIV'),
            _scrollbarYEle = document.createElement('DIV'),
            _scrollbarYSlide = document.createElement('DIV'),
            _paddingRight,
            _paddingBottom;

        _paddingRight = _wrapperEle.offsetWidth - _wrapperEle.clientWidth;
        _paddingBottom = _wrapperEle.offsetHeight - _wrapperEle.clientHeight;

        if (this._isMobile) {
            if (
                _paddingRight === 0 &&
                _wrapperEle.scrollHeight > _wrapperEle.clientHeight
            ) {
                _paddingRight = 25;

                if (_wrapperEle.scrollWidth > _wrapperEle.clientWidth)
                    _contentEle.style.paddingRight = `${_paddingRight}px`;
            }
            if (
                _paddingBottom === 0 &&
                _wrapperEle.scrollHeight > _wrapperEle.clientHeight
            )
                _paddingBottom = 25;
        }

        _wrapperEle.style.paddingRight = `${_paddingRight}px`;
        _wrapperEle.style.paddingBottom = `${_paddingBottom}px`;

        _wrapperEle.addClass('scrollbar__wrapper');
        _contentEle.addClass('scrollbar__content');
        // create horizontal scrollbar
        _scrollbarXEle.addClass('scrollbar__track');
        _scrollbarXEle.addClass('scrollbar__track--x');
        _scrollbarXSlide.addClass('scrollbar__track__slide');
        _scrollbarXSlide.addClass('scrollbar__track__slide--x');
        _scrollbarXEle.appendChild(_scrollbarXSlide);
        // create vertical scrollbar
        _scrollbarYEle.addClass('scrollbar__track');
        _scrollbarYEle.addClass('scrollbar__track--y');
        _scrollbarYSlide.addClass('scrollbar__track__slide');
        _scrollbarYSlide.addClass('scrollbar__track__slide--y');
        _scrollbarYEle.appendChild(_scrollbarYSlide);

        // add event listener to scrollbar
        document.addEventListener('mouseup', (event) => {
            if (this._isMouseDown || this._dragScrollbar !== null) {
                event.preventDefault();
                this._resetMouseEvent();
            }
        });
        document.addEventListener('mousemove', (event) => {
            this._dragScroll(event);
        });
        document.addEventListener('mouseleave', (event) => {
            this._resetMouseEvent();
        });
        _scrollbarYEle.addEventListener('mousedown', (event) => {
            event.preventDefault();
            this._mousedownScroll(event.target, event.offsetY);
        });
        _scrollbarYEle.addEventListener('mousemove', (event) => {
            if (this._isMouseDown) {
                this._resetMouseEvent();
                this._mousedownScroll(event.target, event.offsetY);
            }
        });
        _scrollbarYEle.addEventListener('mouseleave', (event) => {
            if (this._isMouseDown)
                this._resetMouseEvent();
        });
        _scrollbarYSlide.addEventListener('mousedown', (event) => {
            event.preventDefault();
            this._startDrag(event);
        });
        _scrollbarXEle.addEventListener('mousedown', (event) => {
            event.preventDefault();
            this._mousedownScroll(event.target, event.offsetX);
        });
        _scrollbarXEle.addEventListener('mousemove', (event) => {
            if (this._isMouseDown) {
                this._resetMouseEvent();
                this._mousedownScroll(event.target, event.offsetY);
            }
        });
        _scrollbarXEle.addEventListener('mouseleave', (event) => {
            if (this._isMouseDown)
                this._resetMouseEvent();
        });
        _scrollbarXSlide.addEventListener('mousedown', (event) => {
            event.preventDefault();
            this._startDrag(event);
        });

        for (let i = _children.length - 1; i >= 0; i--)
            _contentEle.insertBefore(_children[i], _contentEle.firstChild);
        
        _wrapperEle.appendChild(_contentEle);
        
        ele.appendChild(_wrapperEle);
        ele.appendChild(_scrollbarYEle);
        ele.appendChild(_scrollbarXEle);

        _wrapperEle.addEventListener('scroll', (event) => {
            this._scrollListener(event);
        });

        _observer = new MutationObserver((mutationsList, observer) => {
            this.update();
        });

        _observer.observe(_wrapperEle, {
            characterData: true,
            childList: true,
            subtree: true
        });
    }

    _checkScrollbar (ele) {
        let _paddingRight,
            _paddingBottom,
            _children = ele.children,
            _wrapperEle,
            _contentEle,
            _scrollbarXEle,
            _scrollbarXSlide,
            _scrollbarYEle,
            _scrollbarYSlide,
            _scrollWrapperSize,
            _scrollValue,
            _scrollSize,
            _isXScroll,
            _isYScroll;

        const _checkScrollbarY = () => {
                if (_isYScroll) {
                    _wrapperEle.addClass('scrollbar__wrapper--scroll-y');
                    _scrollbarYEle.addClass('scrollbar__track--visility');

                    if (this._isMobile && _wrapperEle.offsetWidth - _wrapperEle.clientWidth === 0) {
                        _paddingRight = 25;
                        _wrapperEle.style.paddingRight = `${_paddingRight}px`;

                        if (_isXScroll)
                            _contentEle.style.paddingRight = `${_paddingRight}px`;
                    }
                } else {
                    _wrapperEle.removeClass('scrollbar__wrapper--scroll-y');
                    _scrollbarYEle.removeClass('scrollbar__track--visility');
                }
            },
            _checkScrollbarX = () => {
                if (_isXScroll) {
                    _wrapperEle.addClass('scrollbar__wrapper--scroll-x');
                    _scrollbarXEle.addClass('scrollbar__track--visility');

                    if (this._isMobile && _wrapperEle.offsetHeight - _wrapperEle.clientHeight === 0) {
                        _paddingBottom = 25;
                        _wrapperEle.style.paddingBottom = `${_paddingBottom}px`;
                    }
                } else {
                    _wrapperEle.removeClass('scrollbar__wrapper--scroll-x');
                    _scrollbarXEle.removeClass('scrollbar__track--visility');
                }
            };

        for (let i = 0; i < _children.length; i++) {
            if (_children[i].hasClass('scrollbar__wrapper'))
                _wrapperEle = _children[i];
            if (_children[i].hasClass('scrollbar__track--x'))
                _scrollbarXEle = _children[i];
            if (_children[i].hasClass('scrollbar__track--y'))
                _scrollbarYEle = _children[i];
        }

        _isXScroll = _wrapperEle.scrollWidth > _wrapperEle.clientWidth;
        _isYScroll = _wrapperEle.scrollHeight > _wrapperEle.clientHeight;

        _contentEle = ele.querySelector('.scrollbar__content');
        _scrollbarXSlide = _scrollbarXEle.querySelector('.scrollbar__track__slide');
        _scrollbarYSlide = _scrollbarYEle.querySelector('.scrollbar__track__slide');

        _paddingRight = _wrapperEle.offsetWidth - _wrapperEle.clientWidth;
        _paddingBottom = _wrapperEle.offsetHeight - _wrapperEle.clientHeight;

        if (parseInt(_wrapperEle.style.paddingRight) < _paddingRight)
            _wrapperEle.style.paddingRight = `${_paddingRight}px`;
        else
            _paddingRight = parseInt(_wrapperEle.style.paddingRight);

        _contentEle.style.marginRight = `-${_paddingRight}px`;

        if (parseInt(_wrapperEle.style.paddingBottom) < _paddingBottom)
            _wrapperEle.style.paddingBottom = `${_paddingBottom}px`;
        else
            _paddingBottom = parseInt(_wrapperEle.style.paddingBottom);

        if (_isYScroll && !_isXScroll) {
            _checkScrollbarY();
            _checkScrollbarX();
        } else {
            _checkScrollbarX();
            _checkScrollbarY();
        }

        if (_scrollbarYEle.hasClass('scrollbar__track--visility') && _scrollbarXEle.hasClass('scrollbar__track--visility')) {
            _scrollbarXEle.addClass('scrollbar__track--x--with-y');
            _scrollbarYEle.addClass('scrollbar__track--y--with-x');
        } else {
            _scrollbarXEle.removeClass('scrollbar__track--x--with-y');
            _scrollbarYEle.removeClass('scrollbar__track--y--with-x');
        }

        if (_scrollbarXEle.hasClass('scrollbar__track--visility')) {
            _scrollWrapperSize = this._isMobile && _scrollbarYEle.hasClass('scrollbar__track--visility') ? _wrapperEle.scrollWidth - 25 : _wrapperEle.scrollWidth;
            _scrollValue = _scrollbarXEle.clientWidth / _scrollWrapperSize * _wrapperEle.scrollLeft;
            _scrollSize = ele.clientWidth / _scrollWrapperSize * _scrollbarXEle.clientWidth;

            if (_scrollSize % 1 !== 0)
                _scrollSize = _scrollSize - (_scrollSize % 1) + 1;
                
            if (_scrollValue < 0)
                _scrollValue = 0;
            else {
                if (_scrollValue + _scrollSize > _scrollbarXEle.clientWidth)
                    _scrollValue = _scrollbarXEle.clientWidth - _scrollSize;
                else if (_scrollValue % 1 !== 0)
                    _scrollValue = _scrollValue - (_scrollValue % 1) + 1;
            }

            _scrollbarXSlide.style.width = `${_scrollSize}px`;
            _scrollbarXSlide.style.left = `${_scrollValue}px`;
        }

        if (_scrollbarYEle.hasClass('scrollbar__track--visility')) {
            _scrollWrapperSize = this._isMobile && _scrollbarXEle.hasClass('scrollbar__track--visility') ? _wrapperEle.scrollHeight - 25 : _wrapperEle.scrollHeight;
            _scrollValue = _scrollbarYEle.clientHeight / _scrollWrapperSize * _wrapperEle.scrollTop;
            _scrollSize = ele.clientHeight / _scrollWrapperSize * _scrollbarYEle.clientHeight;

            if (_scrollSize % 1 !== 0)
                _scrollSize = _scrollSize - (_scrollSize % 1) + 1;

            if (_scrollValue < 0)
                _scrollValue = 0;
            else {
                if (_scrollValue + _scrollSize > _scrollbarYEle.clientHeight)
                    _scrollValue = _scrollbarYEle.clientHeight - _scrollSize;
                else if (_scrollValue % 1 !== 0)
                    _scrollValue = _scrollValue - (_scrollValue % 1) + 1;
            }
            _scrollbarYSlide.style.height = `${_scrollSize}px`;
            _scrollbarYSlide.style.top = `${_scrollValue}px`;
        }
    }

    _scrollListener (event) {
        this._checkScrollbar(event.target.parentNode);
    }

    update () {
        for (let i = 0; i < this._scrollbarEle.length; i++)
            this._checkScrollbar(this._scrollbarEle[i]);
    }

    scrollTo (to, duration = 0, index = -1) {
        let _scrollEle;

        if (index === -1) {
            for (let i = 0; i < this._scrollbarEle.length; i++) {
                _scrollEle = this._scrollbarEle[i].querySelector('.scrollbar__wrapper');

                ScrollTo(_scrollEle, to, duration);
            }
        } else {
            _scrollEle = this._scrollbarEle[index].querySelector('.scrollbar__wrapper');
            
            ScrollTo(_scrollEle, to, duration);
        }
    }

    _setDisable (ele, isDisable) {
        let _scrollEle = ele.querySelector('.scrollbar__wrapper');

        if (typeof isDisable === 'boolean') {
            if (isDisable) {
                ele.scrollbarOptions.disabledX = true;
                ele.scrollbarOptions.disabledY = true;
                ele.removeClass('scrollbar--disabled-x');
                ele.removeClass('scrollbar--disabled-y');
                ele.addClass('scrollbar--disabled');
                _scrollEle.style.overflow = 'hidden';
            } else {
                ele.scrollbarOptions.disabledX = false;
                ele.scrollbarOptions.disabledY = false;
                ele.removeClass('scrollbar--disabled-x');
                ele.removeClass('scrollbar--disabled-y');
                ele.removeClass('scrollbar--disabled');
                _scrollEle.style.overflow = '';
            }
        } else if (typeof isDisable === 'object') {
            if (isDisable.disabledX === true && isDisable.disabledY === true) {
                ele.scrollbarOptions.disabledX = true;
                ele.scrollbarOptions.disabledY = true;
                ele.removeClass('scrollbar--disabled-x');
                ele.removeClass('scrollbar--disabled-y');
                ele.addClass('scrollbar--disabled');
                _scrollEle.style.overflow = 'hidden';
            } else {
                ele.removeClass('scrollbar--disabled');
                _scrollEle.style.overflow = '';

                if (isDisable.disabledX === true) {
                    ele.scrollbarOptions.disabledX = true;
                    ele.scrollbarOptions.disabledY = false;
                    ele.addClass('scrollbar--disabled-x');
                    ele.removeClass('scrollbar--disabled-y');
                    _scrollEle.style.overflowY = '';
                    _scrollEle.style.overflowX = 'hidden';
                } else if (isDisable.disabledY === true) {
                    ele.scrollbarOptions.disabledX = false;
                    ele.scrollbarOptions.disabledY = true;
                    ele.addClass('scrollbar--disabled-y');
                    ele.removeClass('scrollbar--disabled-x');
                    _scrollEle.style.overflowY = 'hidden';
                    _scrollEle.style.overflowX = '';
                } else {
                    ele.scrollbarOptions.disabledX = false;
                    ele.scrollbarOptions.disabledY = false;
                    ele.removeClass('scrollbar--disabled-y');
                    ele.removeClass('scrollbar--disabled-x');
                    _scrollEle.style.overflowY = '';
                    _scrollEle.style.overflowX = '';
                }
            }
        }
    }

    setDisable (isDisable = false, index = -1) {
        if (index === -1) {
            for (let i = 0; i < this._scrollbarEle.length; i++)
                this._setDisable(this._scrollbarEle[i], isDisable);
        } else
            this._setDisable(this._scrollbarEle[index], isDisable);

        this.update();
    }

    get scrollEle () { return this._scrollbarEle; }

    get scrollWrapper () {
        let _scrollEle = [];

        for (let i = 0; i < this._scrollbarEle.length; i++)
            _scrollEle.push(this._scrollbarEle[i].querySelector('.scrollbar__wrapper'));

        return _scrollEle;
    }
}
