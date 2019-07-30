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

### macro socialMedia(id, class, href, dataset)

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

#### dataset
Set dataset value.<br/>
If need set `data-text`<br/>
Nunjucks Files:
```nunjucks
{% call socialMedia(dataset={text: 'share'}) -%}Share{%- endcall %}
```
Output:
```html
<a href="#" class="socialMedia" data-text="share">Share</a>
```
