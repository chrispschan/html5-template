import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';

import htmlCode from './list.stories.html';
import ResetVariablesCode from '!!raw-loader!./../reset/list.variables.scss';

storiesOf('Common/Typography', module)
  .addParameters({
    readme: {
      sidebar: `<h4>SCSS Variables</h4>
        <ul>
        <li>src/app/common/reset/list.variables.scss</li>
        </ul>
        <h4>SCSS Mixin</h4>
        <ul>
        <li>src/app/common/reset/list.reset.scss</li>
        </ul>`
    }
  })
  .addDecorator(withCode({
    type: 'sass',
    label: 'variables',
    code: ResetVariablesCode
  }))
  .add('Lists', () => htmlCode);
