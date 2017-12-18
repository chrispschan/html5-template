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
