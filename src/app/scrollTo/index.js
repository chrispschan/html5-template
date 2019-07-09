import 'document/document.property';

let _scrollTimeout = null;

export default function ScrollTo (element, to, duration = 100) {
    if (element) {
        let start = element.scrollTop,
            change = null,
            currentTime = 0,
            increment = 20;
        
        let animateScroll = function () {
            currentTime += increment;
            let val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                if (_scrollTimeout !== null) clearTimeout(_scrollTimeout);
                _scrollTimeout = setTimeout(animateScroll, increment);
            }
        };

        if (typeof duration !== 'number')
            duration = parseInt(duration);
        
        if (duration < increment)
            duration = increment;
        else if (duration % increment !== 0)
            duration += (duration % increment);
        
        if (typeof to === 'number') change = to - start;
        else if (typeof to === 'string') {
            let _ele = document.querySelectorAll(to);

            if (_ele.length > 0)
                change = _ele[0].offsetTop - start;
        } else if (to.offsetTop) change = to.offsetTop - start;
        else if (to.length > 0)
            if (to[0].offsetTop) change = to[0].offsetTop - start;
        
        if (change !== null) animateScroll();
    }
}

// t = current time
// b = start value
// c = change in value
// d = duration
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};
