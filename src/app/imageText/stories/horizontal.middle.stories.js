import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';

import htmlCode from './horizontal.middle.stories.html';
import nunjucksCode from '!!raw-loader!./horizontal.middle.stories.html';
import scssCode from '!!raw-loader!./horizontal.stories.scss';
import defaultVariablesCode from '!!raw-loader!../imageText.variables.scss';

import styleCode from '!!raw-loader!sass-loader!./horizontal.stories.scss';

storiesOf('imageText/Horizontal', module)
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
  .add('Middle', () => `<style type="text/css">${styleCode}</style>${htmlCode}`);
