import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';
import { withRunScript } from 'storybook-addon-run-script/html';

import htmlCode from './radioInput.error.stories.html';
import nunjucksCode from '!!raw-loader!./radioInput.error.stories.html';
import scssCode from '!!raw-loader!../../stories/formInput.stories.scss';
import defaultVariablesCode from '!!raw-loader!../radioInput.variables.scss';
// import jsCode from '!!raw-loader!./scrollbar.stories.function.js';

import styleCode from '!!raw-loader!sass-loader!../../stories/formInput.stories.scss';

// import script from 'raw-loader!./scrollbar.stories.function.js';

storiesOf('formInput/radioInput', module)
  .addParameters({
    readme: {
      sidebar: ``
    }
  })
  .addDecorator(withCode({
    type: 'html',
    label: 'nunjucks',
    code: nunjucksCode
  }))
  .addDecorator(withCode({
    type: 'html',
    label: 'html',
    code: htmlCode
  }))
  .addDecorator(withCode({
    type: 'sass',
    label: 'variables',
    code: defaultVariablesCode
  }))
  // .addDecorator(withCode({
  //   type: 'js',
  //   label: 'es6',
  //   code: jsCode
  // }))
  .addDecorator(withCode({
    type: 'sass',
    label: 'scss',
    code: scssCode
  }))
  // .addDecorator(withRunScript(script))
  .add('Error', () => `<style type="text/css">${styleCode}</style>${htmlCode}`);
