// ie get dataset value
Element.prototype.getDataset = function () {
    if (!this.dataset) {
        let attr = this.attributes,
            nameArr = [],
            valName = '';

        this.dataset = {};

        for (let i = 0; i < attr.length; i++) {
            if (attr[i].localName.substr(0, 5) === 'data-') {
                nameArr = attr[i].localName.split('-');
                valName = '';

                for (let j = 1; j < nameArr.length; j++)
                    valName += j === 1 ? nameArr[j] : (nameArr[j].substr(0, 1).toUpperCase() + nameArr[j].substr(1));

                this.dataset[valName] = attr[i].value;
            }
        }
    }

    return this.dataset;
};

// add class without jq
Element.prototype.addClass = function (className) {
    if (this.classList)
        this.classList.add(className);
    else
        this.className += ' ' + className;
};

// remove class without jq
Element.prototype.removeClass = function (className) {
    if (this.classList)
        this.classList.remove(className);
    else
        this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
};

// has class without jq
Element.prototype.hasClass = function (className) {
    let _hasClass = false;

    if (this.classList)
        _hasClass = this.classList.contains(className);
    else
        _hasClass = new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className);

    return _hasClass;
};
