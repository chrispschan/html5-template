// ie get dataset value
Element.getDataset = function (ele) {
    if (!ele.dataset) {
        let attr = ele.attributes,
            nameArr = [],
            valName = '';

        ele.dataset = {};

        for (let i = 0; i < attr.length; i++) {
            if (attr[i].localName.substr(0, 5) === 'data-') {
                nameArr = attr[i].localName.split('-');
                valName = '';

                for (let j = 1; j < nameArr.length; j++)
                    valName += j === 1 ? nameArr[j] : (nameArr[j].substr(0, 1).toUpperCase() + nameArr[j].substr(1));

                ele.dataset[valName] = attr[i].value;
            }
        }
    }

    return ele.dataset;
};

// add class without jq
Element.addClass = function (ele, className) {
    if (ele.classList)
        ele.classList.add(className);
    else
        ele.className += ' ' + className;
};

// remove class without jq
Element.removeClass = function (ele, className) {
    if (ele.classList)
        ele.classList.remove(className);
    else
        ele.className = ele.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
};

// has class without jq
Element.hasClass = function (ele, className) {
    let _hasClass = false;

    if (ele.classList)
        _hasClass = ele.classList.contains(className);
    else
        _hasClass = new RegExp('(^| )' + className + '( |$)', 'gi').test(ele.className);

    return _hasClass;
};
