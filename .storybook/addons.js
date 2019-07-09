import 'storybook-readme/register';
import '@storybook/addon-a11y/register';
import '@storybook/addon-options/register';
import '@storybook/addon-viewport/register';

import * as CodeAddon from 'storybook-addon-code-improved/dist/register';

CodeAddon.setTabs(
  [
    {
      label: 'nunjucks', type: 'html'
    },
    {
      label: 'html', type: 'html'
    },
    {
      label: 'variables', type: 'sass'
    },
    {
      label: 'scss', type: 'sass'
    },
    {
      label: 'es6', type: 'js'
    }
  ]
);
