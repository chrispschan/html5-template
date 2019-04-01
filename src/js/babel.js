// start coding with es6
// if need es5 coding, change gulp.options.js > gulpOptions.es5: true
import Collapse from 'collapse';

let collapse = new Collapse({
    events: {
        afterExpand: function () {
            console.log(collapse.getExpandItemsId());
        }
    }
});

collapse.setButtonEvent(collapse.buttons[1], 'disable');
collapse.setButtonEvent(collapse.buttons[2], 'toggle');
