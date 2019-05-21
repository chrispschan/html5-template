import 'object/object.property';
import 'element/element.property';
import MutationObserver from 'mutationObserver';

export default class Scrollbar {
    constructor (scrollbar = '.scrollbar', options = {}) {
        this._options = Object.assign({
            hasButtons: false,
            size: 10,
            isOverlay: false
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
            let _dragEle = document.querySelectorAll('.scrollbar__bar__drag--moving');

            if (event.target.hasClass('scrollbar__bar__drag')) {
                event.preventDefault();
                event.target.addClass('scrollbar__bar__drag--moving');
                document.scrollbarLastMouseY = event.screenY;
                document.scrollbarLastMouseX = event.screenX;
                document.isScrollbarYDrag = event.target.hasClass('scrollbar__bar__drag--y');
                document.isScrollbarXDrag = event.target.hasClass('scrollbar__bar__drag--x');
                document.scrollbarEle = event.target.parentNode.parentNode;
            } else {
                _dragEle = document.querySelectorAll('.scrollbar__bar__drag--moving');
                for (let i = 0; i < _dragEle.length; i++)
                    _dragEle[i].removeClass('scrollbar__bar__drag--moving');

                document.isScrollbarYDrag = false;
                document.isScrollbarXDrag = false;
                document.scrollbarLastMouseY = 0;
                document.scrollbarLastMouseX = 0;
                document.scrollbarEle = null;
            }
        });
        document.addEventListener('mouseup', (event) => {
            let _dragEle = document.querySelectorAll('.scrollbar__bar__drag--moving');
            for (let i = 0; i < _dragEle.length; i++)
                _dragEle[i].removeClass('scrollbar__bar__drag--moving');

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
                    _barEle = document.scrollbarEle.querySelector('.scrollbar__bar--y');
                    _scrollValue = _wrapperEle.scrollTop + (event.screenY - document.scrollbarLastMouseY) / _barEle.offsetHeight * _wrapperEle.scrollHeight;
                    document.scrollbarLastMouseY = event.screenY;

                    _wrapperEle.scrollTop = _scrollValue;
                } else if (document.isScrollbarXDrag === true) {
                    event.preventDefault();
                    _barEle = document.scrollbarEle.querySelector('.scrollbar__bar--x');
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
            _scrollbarXEle = document.createElement('DIV'),
            _scrollbarXDrag = document.createElement('DIV'),
            _scrollbarXBtnBack,
            _scrollbarXBtnNext,
            _scrollbarYEle = document.createElement('DIV'),
            _scrollbarYDrag = document.createElement('DIV'),
            _scrollbarYBtnBack,
            _scrollbarYBtnNext;
        
        if (ele.scrollbarOptions.hasButtons === true) {
            _scrollbarXBtnBack = document.createElement('BUTTON');
            _scrollbarXBtnBack.addClass('scrollbar__bar__button');
            _scrollbarXBtnBack.addClass('scrollbar__bar__button--x');
            _scrollbarXBtnBack.addClass('scrollbar__bar__button--x--back');
            _scrollbarXBtnNext = document.createElement('BUTTON');
            _scrollbarXBtnNext.addClass('scrollbar__bar__button');
            _scrollbarXBtnNext.addClass('scrollbar__bar__button--x');
            _scrollbarXBtnNext.addClass('scrollbar__bar__button--x--next');
            _scrollbarYBtnBack = document.createElement('BUTTON');
            _scrollbarYBtnBack.addClass('scrollbar__bar__button');
            _scrollbarYBtnBack.addClass('scrollbar__bar__button--y');
            _scrollbarYBtnBack.addClass('scrollbar__bar__button--y--back');
            _scrollbarYBtnNext = document.createElement('BUTTON');
            _scrollbarYBtnNext.addClass('scrollbar__bar__button');
            _scrollbarYBtnBack.addClass('scrollbar__bar__button--y');
            _scrollbarYBtnBack.addClass('scrollbar__bar__button--y--next');
        }

        _wrapperEle.addClass('scrollbar__wrapper');
        _scrollbarXEle.addClass('scrollbar__bar');
        _scrollbarXEle.addClass('scrollbar__bar--x');
        _scrollbarXDrag.addClass('scrollbar__bar__drag');
        _scrollbarXDrag.addClass('scrollbar__bar__drag--x');
        if (ele.scrollbarOptions.hasButtons === true)
            _scrollbarXEle.appendChild(_scrollbarXBtnBack);
        _scrollbarXEle.appendChild(_scrollbarXDrag);
        if (ele.scrollbarOptions.hasButtons === true)
            _scrollbarXEle.appendChild(_scrollbarXBtnNext);

        _scrollbarYEle.addClass('scrollbar__bar');
        _scrollbarYEle.addClass('scrollbar__bar--y');
        _scrollbarYDrag.addClass('scrollbar__bar__drag');
        _scrollbarYDrag.addClass('scrollbar__bar__drag--y');
        if (ele.scrollbarOptions.hasButtons === true)
            _scrollbarXEle.appendChild(_scrollbarYBtnBack);
        _scrollbarYEle.appendChild(_scrollbarYDrag);
        if (ele.scrollbarOptions.hasButtons === true)
            _scrollbarXEle.appendChild(_scrollbarYBtnNext);

        for (let i = 0; i < _children.length; i++)
            _wrapperEle.appendChild(_children[i]);
        
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
            attributes: true,
            attributeFilter: [
                'style'
            ],
            characterData: true,
            childList: true,
            subtree: true
        });
    }

    _checkScrollbar (ele) {
        let _paddingRight,
            _paddingBottom,
            _wrapperEle = ele.querySelector('.scrollbar__wrapper'),
            _scrollbarXEle = ele.querySelector('.scrollbar__bar--x'),
            _scrollbarXDrag = _scrollbarXEle.querySelector('.scrollbar__bar__drag'),
            _scrollbarYEle = ele.querySelector('.scrollbar__bar--y'),
            _scrollbarYDrag = _scrollbarYEle.querySelector('.scrollbar__bar__drag'),
            _sctollValue;

        _paddingRight = _wrapperEle.offsetWidth - _wrapperEle.clientWidth;
        _paddingBottom = _wrapperEle.offsetHeight - _wrapperEle.clientHeight;

        _wrapperEle.style.paddingRight = `${_paddingRight}px`;
        _wrapperEle.style.paddingBottom = `${_paddingBottom}px`;
        _wrapperEle.style.width = `100%`;
        _wrapperEle.style.height = `100%`;

        if (_wrapperEle.scrollHeight > ele.clientHeight) {
            _wrapperEle.addClass('scrollbar__wrapper--scroll-y');
            _scrollbarYEle.addClass('scrollbar__bar--visility');
            if (ele.scrollbarOptions.isOverlay !== true)
                _wrapperEle.style.width = `calc(100% - ${ele.scrollbarOptions.size}px)`;
        } else {
            _wrapperEle.removeClass('scrollbar__wrapper--scroll-y');
            _scrollbarYEle.removeClass('scrollbar__bar--visility');
        }

        if (_wrapperEle.scrollWidth > ele.clientWidth) {
            _wrapperEle.addClass('scrollbar__wrapper--scroll-x');
            _scrollbarXEle.addClass('scrollbar__bar--visility');
            if (ele.scrollbarOptions.isOverlay !== true)
                _wrapperEle.style.height = `calc(100% + ${_paddingBottom - ele.scrollbarOptions.size}px)`;
            else
                _wrapperEle.style.height = `calc(100% + ${_paddingBottom}px)`;
        } else {
            _wrapperEle.removeClass('scrollbar__wrapper--scroll-x');
            _scrollbarXEle.removeClass('scrollbar__bar--visility');
        }

        if (_scrollbarYEle.hasClass('scrollbar__bar--visility') && _scrollbarXEle.hasClass('scrollbar__bar--visility')) {
            _scrollbarXEle.addClass('scrollbar__bar--x--with-y');
            _scrollbarYEle.addClass('scrollbar__bar--y--with-x');
        } else {
            _scrollbarXEle.removeClass('scrollbar__bar--x--with-y');
            _scrollbarYEle.removeClass('scrollbar__bar--y--with-x');
        }

        if (_scrollbarXEle.hasClass('scrollbar__bar--visility')) {
            _sctollValue = _scrollbarXEle.clientWidth / _wrapperEle.scrollWidth * _wrapperEle.scrollLeft;
            _scrollbarXDrag.style.width = `${ele.clientWidth / _wrapperEle.scrollWidth * _scrollbarXEle.clientWidth}px`;
            _scrollbarXDrag.style.left = `${_sctollValue % 1 === 0 ? _sctollValue : (_sctollValue + 1)}px`;
        }

        if (_scrollbarYEle.hasClass('scrollbar__bar--visility')) {
            _sctollValue = _scrollbarYEle.clientHeight / (_wrapperEle.scrollHeight - _paddingBottom) * _wrapperEle.scrollTop;
            _scrollbarYDrag.style.height = `${ele.clientHeight / (_wrapperEle.scrollHeight - _paddingBottom) * _scrollbarYEle.clientHeight}px`;
            _scrollbarYDrag.style.top = `${_sctollValue % 1 === 0 ? _sctollValue : (_sctollValue + 1)}px`;
        }
    }

    _scrollListener (event) {
        this._checkScrollbar(event.target.parentNode);
    }

    update () {
        for (let i = 0; i < this._scrollbarEle.length; i++)
            this._checkScrollbar(this._scrollbarEle[i]);
    }
}
