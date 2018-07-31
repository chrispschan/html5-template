import globalJsdom from 'jsdom-global';

if (typeof window === 'undefined') {
    globalJsdom();

    const Element = {};

    Element.id = 'element';
}
