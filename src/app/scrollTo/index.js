import 'document/document.property';

let _scrollTimeout = null;

export default function ScrollTo (element, to, duration = 0) {
    if (element) {
        let startY = element.scrollTop,
            startX = element.scrollLeft,
            changeY = null,
            changeX = null,
            currentTime = 0,
            increment = 20,
            findEle,
            newValY,
            newValX;
        
        let animateScroll = function () {
            currentTime += increment;
            if (changeY !== null) {
                newValY = Math.easeInOutQuad(currentTime, startY, changeY, duration);
                element.scrollTop = newValY;
            }
            if (changeX !== null) {
                newValX = Math.easeInOutQuad(currentTime, startX, changeX, duration);
                element.scrollLeft = newValX;
            }
            
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
        
        if (typeof to === 'number') changeY = to - startY;
        else if (typeof to === 'string') {
            findEle = document.querySelectorAll(to);

            if (findEle.length > 0) {
                changeY = findEle[0].offsetTop - startY;
                changeX = findEle[0].offsetLeft - startX;
            }
        } else {
            if (Array.isArray(to)) {
                if (to[0].offsetTop) changeY = to[0].offsetTop - startY;
                if (to[0].offsetLeft) changeX = to[0].offsetLeft - startX;
            } else {
                if (to.offsetTop) changeY = to.offsetTop - startY;
                if (to.offsetLeft) changeX = to.offsetLeft - startX;
            }
        }
        
        if (changeY !== null || changeX !== null) animateScroll();
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
