# SocialMedia
Module of call social media share without SDK

## index.js
Class of setup social media and call social media functions.

### Getting Started
```js
import SocialMedia from 'socialMedia';

const socialMedia = new SocialMedia();
```

### SocialMedia (options = {});
#### options
- ele: string (default: `undefined`) - social media elements. Call SocialMedia.addSocialMedia() if ele not null.
- popup: boolean (default: `false`) - Popup a new window when call SocialMedia.call() if set value to `true`.
- href: string (default: `#`) - Share URL.
- type: string (e.g.: `'facebook'`, `'twitter'`) - Share social media type. Share by [addtoany](https://www.addtoany.com) if type have not setting.
- via: string - Only valid when `type=='twitter'`. Twitter via.
- related: string - Only valid when `type=='twitter'`. Twitter related.
- hashtags: string - Only valid when `type=='twitter'`. Twitter hashtags.
- text: string - Only valid when `type=='twitter'`. Twitter share text before URL.

### SocialMedia.addSocialMedia (ele = '.socialMedia', options = {})
Set elements to social media elements.
#### ele
Social media elements.

#### options
Social media options.
- popup: boolean (default: `false`) - Popup a new window when call SocialMedia.call() if set value to `true`.
- href: string (default: `#`) - Share URL.
- type: string (e.g.: `'facebook'`) - Share social media type. Share by [addtoany](https://www.addtoany.com) if type have not setting.
- via: string - Only valid when `type=='twitter'`. Twitter via.
- related: string - Only valid when `type=='twitter'`. Twitter related.
- hashtags: string - Only valid when `type=='twitter'`. Twitter hashtags.
- text: string - Only valid when `type=='twitter'`. Twitter share text before URL.

#### dataset
Some options can use element dataset setting:
- data-popup: string (e.g.: `'true'`)
- data-type: string (e.g.: `'facebook'`)
- data-via: string
- data-related: string
- data-hashtags: string
- data-text: string

### SocialMedia.socialMedia
Return all social media elements.

## socialMedia.html
Nunjucks Files:
```nunjucks
{%- from "socialMedia/socialMedia.html" import socialMedia -%}

{% call socialMedia() -%}Share{%- endcall %}
```
Output:
```html
<a href="#" class="socialMedia">Share</a>
```

### macro map(id, class, href, options)

#### id
Nunjucks Files:
```nunjucks
{% call socialMedia(id='socialMedia1') -%}Share{%- endcall %}
```
Output:
```html
<a href="#" id="socialMedia1" class="socialMedia">Share</a>
```

#### class
Nunjucks Files:
```nunjucks
{% call socialMedia(class='socialMedia1') -%}Share{%- endcall %}
```
Output:
```html
<a href="#" class="socialMedia socialMedia1">Share</a>
```

#### href
Share URL.<br/>
Nunjucks Files:
```nunjucks
{% call socialMedia(href='https://www.google.com.hk/') -%}Share{%- endcall %}
```
Output:
```html
<a href="https://www.google.com.hk/" class="socialMedia">Share</a>
```

#### options
Set dataset value.

##### Set dataset
If need set `data-type`<br/>
Nunjucks Files:
```nunjucks
{% call socialMedia(options: {type: 'facebook'}) -%}Share{%- endcall %}
```
Output:
```html
<a href="#" class="socialMedia" data-type="facebook">Share</a>
```

## socialMedia.handlebars
Handlebars template.

### Getting Started
Handlebars Files:
```handlebars
{{#> socialMedia/socialMedia}}Share{{/socialMedia/socialMedia}}
```
Output:
```html
<a href="#" class="socialMedia">Share</a>
```

#### Set id
Handlebars Files:
```handlebars
{{#> socialMedia/socialMedia id="socialMedia1"}}Share{{/socialMedia/socialMedia}}
```
Output:
```html
<a href="#" id="socialMedia1" class="socialMedia">Share</a>
```

#### Set class
Handlebars Files:
```handlebars
{{#> socialMedia/socialMedia class="socialMedia1"}}Share{{/socialMedia/socialMedia}}
```
Output:
```html
<a href="#" class="socialMedia socialMedia1">Share</a>
```

#### Set href
If not support device or store id not setting, will link to this path.<br/>
Handlebars Files:
```handlebars
{{#> socialMedia/socialMedia href="https://www.google.com.hk/"}}Share{{/socialMedia/socialMedia}}
```
Output:
```html
<a href="https://www.google.com.hk/" class="socialMedia">Share</a>
```

#### Set dataset
If need set `data-type`<br/>
Handlebars Files:
```handlebars
{{#> socialMedia/socialMedia type="facebook"}}Share{{/socialMedia/socialMedia}}
```
Output:
```html
<a href="#" class="socialMedia" data-type="facebook">Share</a>
```
