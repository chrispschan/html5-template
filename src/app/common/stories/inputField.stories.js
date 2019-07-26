import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';

import htmlCode from './inputField.stories.html';
import ResetVariablesCode from '!!raw-loader!./../reset/input.variables.scss';

storiesOf('Common/Form', module)
  .addParameters({
    readme: {
      sidebar: `<h4>SCSS Variables</h4>
        <ul>
        <li>src/app/common/reset/input.variables.scss</li>
        </ul>
        <h4>SCSS Mixin</h4>
        <ul>
        <li>src/app/common/reset/input.reset.scss</li>
        </ul>
        <p>Safari not suppot [type="week"]</p>
        <p>Firefox not suppot [type="datetime-local"|"month"|"week"]</p>
        <p>IE not suppot [type="date"|"datetime-local"|"month"|"week"|"time"]</p>`
    }
  })
  .addDecorator(withCode({
    type: 'sass',
    label: 'variables',
    code: ResetVariablesCode
  }))
  .add('Input Field', () => htmlCode);
