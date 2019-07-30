import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';
import { withRunScript } from 'storybook-addon-run-script/html';

import htmlCode from './textInput.readonly.stories.html';
import nunjucksCode from '!!raw-loader!./textInput.readonly.stories.html';
import scssCode from '!!raw-loader!../../stories/formInput.stories.scss';
import defaultVariablesCode from '!!raw-loader!../textInput.variables.scss';
// import jsCode from '!!raw-loader!./scrollbar.stories.function.js';

import styleCode from '!!raw-loader!sass-loader!../../stories/formInput.stories.scss';

// import script from 'raw-loader!./scrollbar.stories.function.js';

storiesOf('formInput/textInput', module)
  .addParameters({
    readme: {
      sidebar: `<p>IOS [type="date"|"datetime-local"|"month"|"week"|"time"][read-only] not work</p>
        <p>Safari not suppot [type="week"]</p>
        <p>Firefox not suppot [type="datetime-local"|"month"|"week"]</p>
        <p>IE not suppot [type="date"|"datetime-local"|"month"|"week"|"time"]</p>`
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
  .add('Readonly', () => `<style type="text/css">${styleCode}</style>${htmlCode}`);
