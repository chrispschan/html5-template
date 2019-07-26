import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';
import { withRunScript } from 'storybook-addon-run-script/html';

import htmlCode from './validation.stories.html';
import nunjucksCode from '!!raw-loader!./validation.stories.html';
import scssCode from '!!raw-loader!./formInput.stories.scss';
import defaultVariablesCode from '!!raw-loader!../formInput.variables.scss';
import jsCode from '!!raw-loader!./validation.stories.function.js';

import styleCode from '!!raw-loader!sass-loader!./formInput.stories.scss';

import script from 'raw-loader!./validation.stories.function.js';

storiesOf('formInput', module)
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
  .addDecorator(withCode({
    type: 'js',
    label: 'es6',
    code: jsCode
  }))
  .addDecorator(withCode({
    type: 'sass',
    label: 'scss',
    code: scssCode
  }))
  .addDecorator(withRunScript(script))
  .add('Validation', () => `<style type="text/css">${styleCode}</style>${htmlCode}`);
