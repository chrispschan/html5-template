import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';

import htmlCode from './inside.textCenter.stories.html';
import nunjucksCode from '!!raw-loader!./inside.textCenter.stories.html';
import scssCode from '!!raw-loader!./inside.stories.scss';
import defaultVariablesCode from '!!raw-loader!../imageText.default.scss';

import styleCode from '!!raw-loader!sass-loader!./inside.stories.scss';

storiesOf('imageText/Inside', module)
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
    type: 'sass',
    label: 'scss',
    code: scssCode
  }))
  .add('Items Align Middle', () => `<style type="text/css">${styleCode}</style>${htmlCode}`);
