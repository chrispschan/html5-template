import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';
import { withRunScript } from 'storybook-addon-run-script/html';

import htmlCode from './generator.stories.html';
import nunjucksCode from '!!raw-loader!./generator.stories.html';
import jsCode from '!!raw-loader!./generator.stories.function.js';

import script from 'raw-loader!./generator.stories.function.js';

storiesOf('socialMedia', module)
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
    type: 'js',
    label: 'es6',
    code: jsCode
  }))
  .addDecorator(withRunScript(script))
  .add('URL Generator', () => `${htmlCode}`);
