import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';
import { withRunScript } from 'storybook-addon-run-script/html';

import htmlCode from './default.stories.html';
import nunjucksCode from '!!raw-loader!./default.stories.html';
import scssCode from '!!raw-loader!./map.stories.scss';
import defaultVariablesCode from '!!raw-loader!../map.variables.scss';
import jsCode from '!!raw-loader!./default.stories.function.js';

import styleCode from '!!raw-loader!sass-loader!./map.stories.scss';

import script from 'raw-loader!./default.stories.function.js';

storiesOf('map', module)
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
  .add('Default', () => `<style type="text/css">${styleCode}</style>${htmlCode}`);
