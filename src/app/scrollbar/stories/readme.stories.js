import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

import readmeCode from '!!html-loader!markdown-loader!./../README.md';

import styleCode from '!!raw-loader!github-markdown-css/github-markdown.css';

storiesOf('scrollbar', module)
  .addParameters({
    readme: {
      sidebar: ''
    },
    options: {
      selectedPanel: 'ReadmeSidebar',
      showPanel: false
    }
  })
  .add('README', () => `<style type="text/css">${styleCode}</style><div class="markdown-body innerWrapper">${readmeCode}</div>`);
