import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';

import htmlCode from './fontSize.stories.html?font=./src/app/common/fontSize.variables.scss&reset=./src/app/common/reset/font.variables.scss';
import ResetVariablesCode from '!!raw-loader!./../reset/font.variables.scss';
import variablesCode from '!!raw-loader!./../fontSize.variables.scss';

storiesOf('Common/Typography', module)
  .addParameters({
    readme: {
      sidebar: `<h4>SCSS Variables</h4>
        <ul>
        <li>src/app/common/reset/font.variables.scss</li>
        <li>src/app/common/fontSize.variables.scss</li>
        </ul>
        <h4>SCSS Mixin</h4>
        <ul>
        <li>src/app/common/reset/font.reset.scss</li>
        <li>src/app/common/fontSize.mixin.scss</li>
        </ul>`
    }
  })
  .addDecorator(withCode({
    type: 'sass',
    label: 'variables',
    code: `// src/app/common/reset/font.variables.scss\n${ResetVariablesCode}\n// src/app/common/fontSize.variables.scss\n${variablesCode}`
  }))
  .add('Font Size', () => htmlCode);
