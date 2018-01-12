# ScrollTo
Function of scroll element

## Getting Started
ScrollTo(element: element object, to: Number | String | element object, duration: Number = 0)
```js
import ScrollTo from 'scrollTo';

let scrollElement = document.getElementsByTagName('HTML')[0];

// scroll to 500px
ScrollTo(scrollElement, 500);

// scroll with animate
ScrollTo(scrollElement, 500, 500);

// scroll to element by id / class name (find id first)
ScrollTo(scrollElement, 'section1');

// scroll to element
let scrollToElement = document.getElementById('section1');
ScrollTo(scrollElement, scrollToElement);
```
