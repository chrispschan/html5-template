import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';
import { withRunScript } from 'storybook-addon-run-script/html';

import htmlCode from './demo.stories.html';
import nunjucksCode from '!!raw-loader!./demo.stories.html';
import scssCode from '!!raw-loader!./demo.stories.scss';
import jsCode from '!!raw-loader!./demo.stories.function.js';

import styleCode from '!!raw-loader!sass-loader!./demo.stories.scss';

import script from 'raw-loader!./demo.stories.function.js';

console.log(script);

storiesOf('scrollTo', module)
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
    label: 'scss',
    code: scssCode
  }))
  .addDecorator(withCode({
    type: 'js',
    label: 'es6',
    code: jsCode
  }))
  .addDecorator(withRunScript(script))
  .add('Demo', () => `<style type="text/css">${styleCode}</style>${htmlCode}`);
