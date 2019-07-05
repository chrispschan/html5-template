import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import withCode from 'storybook-addon-code-improved';

import htmlCode from './inlineTextElements.stories.html';

storiesOf('Common/Typography', module)
  .add('Inline Text Elements', () => htmlCode);
