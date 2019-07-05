import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';

import htmlCode from './button.stories.html';
import ResetVariablesCode from '!!raw-loader!./reset/button.variables.scss';

storiesOf('Common/Form', module)
  .addParameters({
    readme: {
      sidebar: `<h4>SCSS Variables</h4>
        <ul>
        <li>src/app/common/reset/button.variables.scss</li>
        </ul>
        <h4>SCSS Mixin</h4>
        <ul>
        <li>src/app/common/reset/button.reset.scss</li>
        </ul>`
    }
  })
  .addDecorator(withCode({
    type: 'sass',
    label: 'variables',
    code: ResetVariablesCode
  }))
  .add('Button', () => htmlCode);
