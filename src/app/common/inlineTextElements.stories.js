import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';

import htmlCode from './inlineTextElements.stories.html';
import ResetVariablesCode from '!!raw-loader!./reset/link.variables.scss';

storiesOf('Common/Typography', module)
  .addDecorator(withCode({
    type: 'sass',
    label: 'variables',
    code: ResetVariablesCode
  }))
  .add('Inline Text Elements', () => htmlCode);
