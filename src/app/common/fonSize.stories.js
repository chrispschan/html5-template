import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';

import htmlCode from './fontSize.stories.html?font=./src/app/common/fontSize.variables.scss&reset=./src/app/common/reset/font.variables.scss';
import ResetVariablesCode from '!!raw-loader!./reset/font.variables.scss';
import variablesCode from '!!raw-loader!./fontSize.variables.scss';

storiesOf('Common/Typography', module)
  .addDecorator(withCode({
    type: 'sass',
    label: 'variables',
    code: `// src/app/common/reset/font.variables.scss\n${ResetVariablesCode}\n// src/app/common/fontSize.variables.scss\n${variablesCode}`
  }))
  .add('Font Size', () => htmlCode);
