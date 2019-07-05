import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';

import htmlCode from './button.stories.html';
import ResetVariablesCode from '!!raw-loader!./reset/button.variables.scss';

storiesOf('Common/Form', module)
  .addDecorator(withCode({
    type: 'sass',
    label: 'variables',
    code: ResetVariablesCode
  }))
  .add('Button', () => htmlCode);
