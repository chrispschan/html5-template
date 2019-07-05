import { configure, addParameters, addDecorator  } from '@storybook/html';
import { addReadme } from 'storybook-readme/html';
import { withA11y } from '@storybook/addon-a11y';

// import common style
import './../src/css/style.scss';

// automatically import all files ending in *.stories.js
const req = require.context('../src/app', true, /^(?!_.*\.stories\.js).*\.stories\.js$/);
function loadStories() {
  req.keys().sort().forEach(filename => req(filename));
}

addDecorator(addReadme);
addDecorator(withA11y);

// Option defaults:
addParameters({
  options: {
    name: 'HTML5 Template',
    url: '#',
    showPanel: true,
    panelPosition: 'bottom',
  }
});

configure(loadStories, module);
