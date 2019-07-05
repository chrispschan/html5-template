import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';

import htmlCode from './inputField.stories.html';
import ResetVariablesCode from '!!raw-loader!./reset/input.variables.scss';

storiesOf('Common/Form', module)
  .addDecorator(withCode({
    type: 'sass',
    label: 'variables',
    code: ResetVariablesCode
  }))
  .add('Input Field', () => htmlCode);
