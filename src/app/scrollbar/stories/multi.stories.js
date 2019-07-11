import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';
import { withRunScript } from 'storybook-addon-run-script/html';

import htmlCode from './multi.stories.html';
import nunjucksCode from '!!raw-loader!./multi.stories.html';
import scssCode from '!!raw-loader!./multi.stories.scss';
import defaultVariablesCode from '!!raw-loader!../scrollbar.variables.scss';
import jsCode from '!!raw-loader!./multi.stories.function.js';

import styleCode from '!!raw-loader!sass-loader!./multi.stories.scss';

import script from 'raw-loader!./multi.stories.function.js';

storiesOf('scrollbar', module)
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
  .add('Multi Style', () => `<style type="text/css">${styleCode}</style>${htmlCode}`);
