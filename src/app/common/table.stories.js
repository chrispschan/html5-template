import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';

import htmlCode from './table.stories.html';
import ResetVariablesCode from '!!raw-loader!./reset/table.variables.scss';

storiesOf('Common', module)
  .addParameters({
    readme: {
      sidebar: `<h4>SCSS Variables</h4>
        <ul>
        <li>src/app/common/reset/table.variables.scss</li>
        </ul>
        <h4>SCSS Mixin</h4>
        <ul>
        <li>src/app/common/reset/table.reset.scss</li>
        </ul>`
    }
  })
  .addDecorator(withCode({
    type: 'sass',
    label: 'variables',
    code: ResetVariablesCode
  }))
  .add('Table', () => htmlCode);
