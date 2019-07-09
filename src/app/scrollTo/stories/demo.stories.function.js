import ScrollTo from 'scrollTo';

const scrollElement = document.getElementsByTagName("HTML")[0];
const scrollPx = document.getElementById('scrollPx');
const selectElement = document.getElementById('scrollElement');
const durationElement = document.getElementById('scrollDuration');

window.scrollToPx = () => {
  ScrollTo(scrollElement, parseInt(scrollPx.value), parseInt(durationElement.value));
};

window.scrollToElement = () => {
  ScrollTo(scrollElement, selectElement.options[selectElement.selectedIndex].value, parseInt(durationElement.value));
};
