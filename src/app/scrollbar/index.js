import 'object/object.property';
import 'element/element.property';
import MutationObserver from 'mutationObserver';

export default class Scrollbar {
    constructor (scrollbar = '.scrollbar', options = {}) {
        this._options = Object.assign({
            hasButtons: false
        }, options);

        this._scrollbarEle = document.querySelectorAll(scrollbar);

        this._initScrollbar(this);
    }

    _initScrollbar (self) {
        let _options = {};

        for (let i = 0; i < self._scrollbarEle.length; i++) {
            _options = Object.assign({}, self._options);

            self._scrollbarEle[i].getDataset();

            /*----------  self options from dataset  ----------*/
            if (typeof self._scrollbarEle[i].dataset === 'object')
                self._scrollbarEle[i].scrollbarOptions = Object.assign(_options, self._scrollbarEle[i].dataset);

            this._cerateScrollbar(self._scrollbarEle[i]);
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
        document.addEventListener('mousedown', (event) => {
            let _dragEle = document.querySelectorAll('.scrollbar__track__slide--moving');

            if (event.target.hasClass('scrollbar__track__slide')) {
                event.preventDefault();
                event.target.addClass('scrollbar__track__slide--moving');
                document.scrollbarLastMouseY = event.screenY;
                document.scrollbarLastMouseX = event.screenX;
                document.isScrollbarYDrag = event.target.hasClass('scrollbar__track__slide--y');
                document.isScrollbarXDrag = event.target.hasClass('scrollbar__track__slide--x');
                document.scrollbarEle = event.target.parentNode.parentNode;
            } else {
                _dragEle = document.querySelectorAll('.scrollbar__track__slide--moving');
                for (let i = 0; i < _dragEle.length; i++)
                    _dragEle[i].removeClass('scrollbar__track__slide--moving');

                document.isScrollbarYDrag = false;
                document.isScrollbarXDrag = false;
                document.scrollbarLastMouseY = 0;
                document.scrollbarLastMouseX = 0;
                document.scrollbarEle = null;
            }
        });
        document.addEventListener('mouseup', (event) => {
            let _dragEle = document.querySelectorAll('.scrollbar__track__slide--moving');
            for (let i = 0; i < _dragEle.length; i++)
                _dragEle[i].removeClass('scrollbar__track__slide--moving');

            document.isScrollbarYDrag = false;
            document.isScrollbarXDrag = false;
            document.scrollbarEle = null;
        });
        document.addEventListener('mousemove', (event) => {
            let _wrapperEle;
            let _barEle;
            let _scrollValue;

            if (document.scrollbarEle !== null) {
                _wrapperEle = document.scrollbarEle.querySelector('.scrollbar__wrapper');

                if (document.isScrollbarYDrag === true) {
                    event.preventDefault();
                    _barEle = document.scrollbarEle.querySelector('.scrollbar__track--y');
                    _scrollValue = _wrapperEle.scrollTop + (event.screenY - document.scrollbarLastMouseY) / _barEle.offsetHeight * _wrapperEle.scrollHeight;
                    document.scrollbarLastMouseY = event.screenY;

                    _wrapperEle.scrollTop = _scrollValue;
                } else if (document.isScrollbarXDrag === true) {
                    event.preventDefault();
                    _barEle = document.scrollbarEle.querySelector('.scrollbar__track--x');
                    _scrollValue = _wrapperEle.scrollLeft + (event.screenX - document.scrollbarLastMouseX) / _barEle.offsetWidth * _wrapperEle.scrollWidth;
                    document.scrollbarLastMouseX = event.screenX;

                    _wrapperEle.scrollLeft = _scrollValue;
                }
            }
        });

        window.addEventListener('resize', (event) => {
            this.update();
        });
    }

    _cerateScrollbar (ele) {
        let _observer,
            _children = ele.children,
            _wrapperEle = document.createElement('DIV'),
            _contentEle = document.createElement('DIV'),
            _scrollbarXEle = document.createElement('DIV'),
            _scrollbarXSlide = document.createElement('DIV'),
            _scrollbarXBtnBack,
            _scrollbarXBtnNext,
            _scrollbarYEle = document.createElement('DIV'),
            _scrollbarYSlide = document.createElement('DIV'),
            _scrollbarYBtnBack,
            _scrollbarYBtnNext,
            _paddingRight,
            _paddingBottom;

        _paddingRight = _wrapperEle.offsetWidth - _wrapperEle.clientWidth;
        _paddingBottom = _wrapperEle.offsetHeight - _wrapperEle.clientHeight;

        _wrapperEle.style.paddingRight = `${_paddingRight}px`;
        _wrapperEle.style.paddingBottom = `${_paddingBottom}px`;

        _contentEle.style.minWidth = `calc(100% + ${_paddingRight}px)`;
        
        if (ele.scrollbarOptions.hasButtons === true) {
            _scrollbarXBtnBack = document.createElement('BUTTON');
            _scrollbarXBtnBack.addClass('scrollbar__track__button');
            _scrollbarXBtnBack.addClass('scrollbar__track__button--x');
            _scrollbarXBtnBack.addClass('scrollbar__track__button--x--back');
            _scrollbarXBtnNext = document.createElement('BUTTON');
            _scrollbarXBtnNext.addClass('scrollbar__track__button');
            _scrollbarXBtnNext.addClass('scrollbar__track__button--x');
            _scrollbarXBtnNext.addClass('scrollbar__track__button--x--next');
            _scrollbarYBtnBack = document.createElement('BUTTON');
            _scrollbarYBtnBack.addClass('scrollbar__track__button');
            _scrollbarYBtnBack.addClass('scrollbar__track__button--y');
            _scrollbarYBtnBack.addClass('scrollbar__track__button--y--back');
            _scrollbarYBtnNext = document.createElement('BUTTON');
            _scrollbarYBtnNext.addClass('scrollbar__track__button');
            _scrollbarYBtnBack.addClass('scrollbar__track__button--y');
            _scrollbarYBtnBack.addClass('scrollbar__track__button--y--next');
        }

        _wrapperEle.addClass('scrollbar__wrapper');
        _contentEle.addClass('scrollbar__content');
        _scrollbarXEle.addClass('scrollbar__track');
        _scrollbarXEle.addClass('scrollbar__track--x');
        _scrollbarXSlide.addClass('scrollbar__track__slide');
        _scrollbarXSlide.addClass('scrollbar__track__slide--x');

        if (ele.scrollbarOptions.hasButtons === true)
            _scrollbarXEle.appendChild(_scrollbarXBtnBack);
        _scrollbarXEle.appendChild(_scrollbarXSlide);
        if (ele.scrollbarOptions.hasButtons === true)
            _scrollbarXEle.appendChild(_scrollbarXBtnNext);

        _scrollbarYEle.addClass('scrollbar__track');
        _scrollbarYEle.addClass('scrollbar__track--y');
        _scrollbarYSlide.addClass('scrollbar__track__slide');
        _scrollbarYSlide.addClass('scrollbar__track__slide--y');
        if (ele.scrollbarOptions.hasButtons === true)
            _scrollbarXEle.appendChild(_scrollbarYBtnBack);
        _scrollbarYEle.appendChild(_scrollbarYSlide);
        if (ele.scrollbarOptions.hasButtons === true)
            _scrollbarXEle.appendChild(_scrollbarYBtnNext);

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
            _scrollValue,
            _scrollSize;

        for (let i = 0; i < _children.length; i++) {
            if (_children[i].hasClass('scrollbar__wrapper'))
                _wrapperEle = _children[i];
            if (_children[i].hasClass('scrollbar__track--x'))
                _scrollbarXEle = _children[i];
            if (_children[i].hasClass('scrollbar__track--y'))
                _scrollbarYEle = _children[i];
        }

        _contentEle = ele.querySelector('.scrollbar__content');
        _scrollbarXSlide = _scrollbarXEle.querySelector('.scrollbar__track__slide');
        _scrollbarYSlide = _scrollbarYEle.querySelector('.scrollbar__track__slide');

        _contentEle.style.height = `100%`;

        _paddingRight = _wrapperEle.offsetWidth - _wrapperEle.clientWidth;
        _paddingBottom = _wrapperEle.offsetHeight - _wrapperEle.clientHeight;

        if (parseInt(_wrapperEle.style.paddingRight) < _paddingRight)
            _wrapperEle.style.paddingRight = `${_paddingRight}px`;
        else
            _paddingRight = parseInt(_wrapperEle.style.paddingRight);

        _contentEle.style.minWidth = `calc(100% + ${_paddingRight}px)`;

        if (parseInt(_wrapperEle.style.paddingBottom) < _paddingBottom)
            _wrapperEle.style.paddingBottom = `${_paddingBottom}px`;
        else
            _paddingBottom = parseInt(_wrapperEle.style.paddingBottom);

        if (_wrapperEle.scrollHeight > _wrapperEle.clientHeight) {
            _wrapperEle.addClass('scrollbar__wrapper--scroll-y');
            _scrollbarYEle.addClass('scrollbar__track--visility');
        } else {
            _contentEle.style.height = `calc(100% + ${_paddingBottom}px)`;
            _wrapperEle.removeClass('scrollbar__wrapper--scroll-y');
            _scrollbarYEle.removeClass('scrollbar__track--visility');
        }

        if (_wrapperEle.scrollWidth > _wrapperEle.clientWidth) {
            _wrapperEle.addClass('scrollbar__wrapper--scroll-x');
            _scrollbarXEle.addClass('scrollbar__track--visility');
        } else {
            _wrapperEle.removeClass('scrollbar__wrapper--scroll-x');
            _scrollbarXEle.removeClass('scrollbar__track--visility');
        }

        if (_scrollbarYEle.hasClass('scrollbar__track--visility') && _scrollbarXEle.hasClass('scrollbar__track--visility')) {
            _scrollbarXEle.addClass('scrollbar__track--x--with-y');
            _scrollbarYEle.addClass('scrollbar__track--y--with-x');
        } else {
            _scrollbarXEle.removeClass('scrollbar__track--x--with-y');
            _scrollbarYEle.removeClass('scrollbar__track--y--with-x');
        }

        if (_scrollbarXEle.hasClass('scrollbar__track--visility')) {
            _scrollValue = _scrollbarXEle.clientWidth / _wrapperEle.scrollWidth * _wrapperEle.scrollLeft;
            _scrollSize = ele.clientWidth / _wrapperEle.scrollWidth * _scrollbarXEle.clientWidth;

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
            _scrollValue = _scrollbarYEle.clientHeight / _wrapperEle.scrollHeight * _wrapperEle.scrollTop;
            _scrollSize = ele.clientHeight / _wrapperEle.scrollHeight * _scrollbarYEle.clientHeight;

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
        console.log(event);
        this._checkScrollbar(event.target.parentNode);
    }

    update () {
        for (let i = 0; i < this._scrollbarEle.length; i++)
            this._checkScrollbar(this._scrollbarEle[i]);
    }
}
