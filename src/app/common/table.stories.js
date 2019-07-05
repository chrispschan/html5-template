import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';

import htmlCode from './table.stories.html';
import ResetVariablesCode from '!!raw-loader!./reset/table.variables.scss';

storiesOf('Common', module)
  .addDecorator(withCode({
    type: 'sass',
    label: 'variables',
    code: ResetVariablesCode
  }))
  .add('Table', () => htmlCode);
