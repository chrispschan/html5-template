import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';
import { withRunScript } from 'storybook-addon-run-script/html';

import htmlCode from './demo.stories.html';
import nunjucksCode from '!!raw-loader!./demo.stories.html';
import jsCode from '!!raw-loader!./demo.stories.function.js';

import script from 'raw-loader!./demo.stories.function.js';

storiesOf('socialMedia', module)
  .addParameters({
    readme: {
      sidebar: `<p>
        WhatsApp share only work on desktop browser.<br/>
        It will open WhatsApp but cannot pass the URL to app when use mobile browser.<br/>
        Please use "deepLink" component for WhatsApp share.
      </p>`
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
  .add('Demo', () => `${htmlCode}`);
