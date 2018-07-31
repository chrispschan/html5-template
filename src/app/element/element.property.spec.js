import 'jsdomSetup/jsdomSetup';
import 'element/element.property';

describe('element.property.js', function () {
    describe('Element.getDataset', function () {
        it(`should return {name: 'test', id: '001'} to element.dataset`, function () {
            document.body.innerHTML += `<div id="element1" data-name="test" data-id="001"></div>`;

            let ele = document.getElementById('element1');

            Element.getDataset(ele);

            expect(ele.dataset.name).toBe('test');
            expect(ele.dataset.id).toBe('001');

            document.body.removeChild(ele);
        });
    });

    describe('Element.addClass', function () {
        it(`should add 'class2' to element`, function () {
            document.body.innerHTML += `<div id="element2" class="class1"></div>`;

            let ele = document.getElementById('element2');

            let classes = '';

            if (ele.classList)
                classes = ele.classList.value;
            else
                classes = ele.className;

            expect(classes).toBe('class1');

            Element.addClass(ele, 'class2');

            if (ele.classList)
                classes = ele.classList.value;
            else
                classes = ele.className;

            expect(classes).toBe('class1 class2');

            document.body.removeChild(ele);
        });
    });

    describe('Element.removeClass', function () {
        it(`should remove 'class2' form element`, function () {
            document.body.innerHTML += `<div id="element3" class="class1 class2"></div>`;

            let ele = document.getElementById('element3');

            let classes = '';

            if (ele.classList)
                classes = ele.classList.value;
            else
                classes = ele.className;

            expect(classes).toBe('class1 class2');

            Element.removeClass(ele, 'class2');

            if (ele.classList)
                classes = ele.classList.value;
            else
                classes = ele.className;

            expect(classes).toBe('class1');

            document.body.removeChild(ele);
        });
    });

    describe('Element.hasClass', function () {
        it(`should find 'class2' in element`, function () {
            document.body.innerHTML += `<div id="element4" class="class1 class2"></div>`;

            let ele = document.getElementById('element4');

            expect(Element.hasClass(ele, 'class3')).toBe(false);
            expect(Element.hasClass(ele, 'class2')).toBe(true);

            document.body.removeChild(ele);
        });
    });
});
