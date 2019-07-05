import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';

import htmlCode from './color.stories.html?color=./src/app/common/color.variables.scss';
import variablesCode from '!!raw-loader!./color.variables.scss';

storiesOf('Common', module)
  .addDecorator(withCode({
    type: 'sass',
    label: 'variables',
    code: variablesCode
  }))
  .add('Color', () => htmlCode);
