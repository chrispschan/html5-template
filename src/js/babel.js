// start coding with es6
// if need es5 coding, change gulp.options.js > gulpOptions.es5: true
import Scrollbar from 'scrollbar';

const scrollbar = new Scrollbar('.scrollbar', {
    isOverlay: true
});

console.log(scrollbar);
