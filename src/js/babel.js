// start coding with es6
// if need es5 coding, change gulp.options.js > gulpOptions.es5: true
import Collapse from 'collapse';

let collapse = new Collapse({
    accordion: true,
    events: {
        afterExpand: function () {
            console.log(collapse.getExpandItemsId());
        }
    }
});

console.log(collapse.expand(['collapse1', 'collapse2']));

document.querySelector('#collapseTest').onclick = function () {
    collapse.expand([], false);
    collapse.expand(document.querySelector('#collapseId').value);
};
