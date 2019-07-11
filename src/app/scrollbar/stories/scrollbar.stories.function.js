import Scrollbar from 'scrollbar';

const scrollbar = new Scrollbar('#scrollbar');

const scrollElement = document.getElementsByTagName("HTML")[0];
const scrollPx = document.getElementById('scrollPx');
const selectElement = document.getElementById('scrollElement');
const durationElement = document.getElementById('scrollDuration');
const scrollDisableX = document.getElementById('scrollDisableX');
const scrollDisableY = document.getElementById('scrollDisableY');

window.scrollToPx = () => {
  scrollbar.scrollTo(parseInt(scrollPx.value), parseInt(durationElement.value));
};

window.scrollToElement = () => {
  scrollbar.scrollTo(selectElement.options[selectElement.selectedIndex].value, parseInt(durationElement.value));
};

window.setScrollDisable = () => {
  scrollbar.setDisable({
    disabledX: scrollDisableX.checked,
    disabledY: scrollDisableY.checked
  });
};
