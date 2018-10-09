# DeepLink
Module of call mobile app deeplink

## index.js
Class of setup deeplink and call deeplink functions.

### Getting Started
```js
import DeepLink from 'deepLink';

const deepLink = new DeepLink();
```

### DeepLink (options = {});
#### options
- ele: string (default: `undefined`) - deeplink elements. Call DeepLink.addDeepLink() if ele not null.
- delay: number (default: `300`) - wait deeplink loading. Will call store deeplink if timeout and store setting not false.
- windows: object - windows phone app setting
    - support: boolean (default: `false`) - support windows phone app
    - id: string (default: `undefined`) - windows phone app id
    - deepLink: srting (default: `undefined`) - windows phone deeplink. Use options.deepLink if not setting.
- android: object - android app setting
    - support: boolean (default: `true`) - support android app
    - id: string (default: `undefined`) - android app id
    - deepLink: srting (default: `undefined`) - android deeplink. Use options.deepLink if not setting.
- ios: object - ios app setting
    - support: boolean (default: `true`) - support ios app
    - id: string (default: `undefined`) - ios app id
    - deepLink: srting (default: `undefined`) - ios deeplink. Use options.deepLink if not setting.
- deepLink: string (default: `undefined`) - base deeplink
- appName: string (default: `''`) - app name

### DeepLink.addDeepLink (ele = '.deepLink', options = {})
Set elements to deeplink elements.
#### ele
Deeplink elements.

#### options
Deeplink options.
- delay: number (default: 300) - wait deeplink loading. Will call store deeplink if timeout and store setting not null.
- windows: object - windows phone app setting
    - support: boolean (default: false) - support windows phone app
    - id: string (default: null) - windows phone app id
    - deepLink: srting (default: null) - windows phone deeplink. Use options.deepLink if not setting.
- android: object - android app setting
    - support: boolean (default: true) - support android app
    - id: string (default: null) - android app id
    - deepLink: srting (default: null) - android deeplink. Use options.deepLink if not setting.
- ios: object - ios app setting
    - support: boolean (default: true) - support ios app
    - id: string (default: null) - ios app id
    - deepLink: srting (default: null) - ios deeplink. Use options.deepLink if not setting.
- href: string (default: 'javascript:;') - link if not support device or not store setting
- deepLink: string (default: null) - base deeplink
- appName: string (default: '') - app name

#### dataset
Some options can use element dataset setting:
- data-deep-link: string (e.g.: `'deeplink://path'`)
- data-app-name: string (e.g.: `'app name'`)
- data-windows-id: string (e.g.: `'EXAPLE123'`)
- data-windows-link: string (e.g.: `'deeplink://window/path'`)
- data-android-id: string (e.g.: `'com.company.appname'`)
- data-android-link: string (e.g.: `'deeplink://android/path'`)
- data-ios-id: string (e.g.: `'375380948'`)
- data-ios-link: string (e.g.: `'deeplink://ios/path'`)

### DeepLink.call (options = {}, onLoadOpen = false)
Call deeplink without click link.

#### options
Deeplink options.
- delay: number (default: `300`) - wait deeplink loading. Will call store deeplink if timeout and store setting not null.
- windows: object - windows phone app setting
    - support: boolean (default: `false`) - support windows phone app
    - id: string (default: `null`) - windows phone app id
    - deepLink: srting (default: `null`) - windows phone deeplink. Use options.deepLink if not setting.
- android: object - android app setting
    - support: boolean (default: `true`) - support android app
    - id: string (default: `null`) - android app id
    - deepLink: srting (default: `null`) - android deeplink. Use options.deepLink if not setting.
- ios: object - ios app setting
    - support: boolean (default: `true`) - support ios app
    - id: string (default: `null`) - ios app id
    - deepLink: srting (default: `null`) - ios deeplink. Use options.deepLink if not setting.
- href: string (default: `'javascript:;'`) - link if not support device or not store setting
- deepLink: string (default: `null`) - base deeplink
- appName: string (default: `''`) - app name

#### onLoadOpen
On window.load redirect.

### DeepLink.os
Return device type ('ios' | 'windows' | 'android' | 'other')

### DeepLink.deepLink
Return all deeplink elements.

## deepLink.html
Nunjucks Files:
```nunjucks
{%- from "deepLink/deepLink.html" import deepLink -%}

{% call deepLink() -%}Deeplink{%- endcall %}
```
Output:
```html
<a href="javascript:;" class="deepLink">Deeplink</a>
```

### macro map(id, class, href, dataset, options)

#### id
Nunjucks Files:
```nunjucks
{% call deepLink(id='deepLink1') -%}Deeplink{%- endcall %}
```
Output:
```html
<a href="javascript:;" id="deepLink1" class="deepLink">Deeplink</a>
```

#### class
Nunjucks Files:
```nunjucks
{% call deepLink(class='deepLink1') -%}Deeplink{%- endcall %}
```
Output:
```html
<a href="javascript:;" class="deepLink deepLink1">Deeplink</a>
```

#### href
If not support device or store id not setting, will link to this path.<br/>
Nunjucks Files:
```nunjucks
{% call deepLink(href='https://www.google.com.hk/') -%}Deeplink{%- endcall %}
```
Output:
```html
<a href="https://www.google.com.hk/" class="deepLink">Deeplink</a>
```

#### dataset
Set dataset value.<br/>
If need set `data-deep-link`<br/>
Nunjucks Files:
```nunjucks
{% call deepLink(dataset: {deepLink: 'deeplink://path'}) -%}Deeplink{%- endcall %}
```
Output:
```html
<a href="javascript:;" class="deepLink" data-deep-link="deeplink://path">Deeplink</a>
```

#### options
Set link target.<br/>
Nunjucks Files:
```nunjucks
{% call deepLink(options: {target: '_blank'}) -%}Deeplink{%- endcall %}
```
Output:
```html
<a href="javascript:;" target="_blank" class="deepLink">Deeplink</a>
```

## deepLink.handlebars
Handlebars template.

### Getting Started
Handlebars Files:
```handlebars
{{#> deepLink/deepLink}}Deeplink{{/deepLink/deepLink}}
```
Output:
```html
<a href="javascript:;" class="deepLink">Deeplink</a>
```

#### Set id
Handlebars Files:
```handlebars
{{#> deepLink/deepLink id="deepLink1"}}Deeplink{{/deepLink/deepLink}}
```
Output:
```html
<a href="javascript:;" id="deepLink1" class="deepLink">Deeplink</a>
```

#### Set class
Handlebars Files:
```handlebars
{{#> deepLink/deepLink class="deepLink1"}}Deeplink{{/deepLink/deepLink}}
```
Output:
```html
<a href="javascript:;" class="deepLink deepLink1">Deeplink</a>
```

#### Set href
If not support device or store id not setting, will link to this path.<br/>
Handlebars Files:
```handlebars
{{#> deepLink/deepLink href="https://www.google.com.hk/"}}Deeplink{{/deepLink/deepLink}}
```
Output:
```html
<a href="https://www.google.com.hk/" class="deepLink deepLink1">Deeplink</a>
```

#### Set dataset
If need set `data-deep-link`<br/>
Handlebars Files:
```handlebars
{{#setVal}}
    dataset:dataset = {"deepLink": "deeplink://path"}
{{/setVal}}
{{#> deepLink/deepLink dataset=@local.dataset}}Deeplink{{/deepLink/deepLink}}
```
Output:
```html
<a href="javascript:;" class="deepLink" data-deep-link="deeplink://path">Deeplink</a>
```

#### Set link target
Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"target": "_blank"}
{{/setVal}}
{{#> deepLink/deepLink options=@local.options}}Deeplink{{/deepLink/deepLink}}
```
Output:
```html
<a href="javascript:;" target="_blank" class="deepLink">Deeplink</a>
```
