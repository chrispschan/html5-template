# Scrollbar
Module of custom scrollbar.

## index.js
Class of setup custom scrollbar.

### Getting Started
```js
import Scrollbar from 'scrollbar';

const scrollbar = new Scrollbar();
```

### Scrollbar (scrollbar:string = '.scrollbar', options:object = {});
#### scrollbar
Scrollbar elements.
#### options
- disabledX: boolean (default: false) - disable horizontal scrollbar if true
- disabledY: boolean (default: false) - disable vertical scrollbar if true

#### dataset
Some options can use element dataset setting:
- data-disabled-x: string = `'true' | 'false'`
- data-disabled-y: string = `'true' | 'false'`

### Scrollbar.update ()
Update scrollbar elements position and sizing.

### Scrollbar.scrollTo (to: Number | String | element object | Object { offsetTop: Number, offsetLeft: Number }, duration: Number = 0, index: Number = -1)
Set scrollbar scroll position.
#### to
Scroll to position / element.
#### duration
Scroll animation duration.
#### index
Scrollbar.scrollEle array index (-1 = all)

### Scrollbar.setDisable (isDisable: Boolean | Object { disabledX: Boolean, disabledY: Boolean } = false, index = -1)
Set scrollbar to disable or not.
#### isDisable
Dose scrollbar set to disable
#### index
Scrollbar.scrollEle array index (-1 = all)

### Scrollbar.scrollEle
Return all scrollbar elements.

### Scrollbar.scrollWrapper
Return all scrollbar wrapper elements.

## scrollbar.html
Nunjucks template.

### Getting Started
Nunjucks Files:
```nunjucks
{%- from "scrollbar/scrollbar.html" import scrollbar -%}

{% call scrollbar() -%}
    scrollbar
{% endcall %}
```
Output:
```html
<div class="scrollbar">scrollbar</div>
```

### macro scrollbar(id, class, dataset, options)

#### id
Nunjucks Files:
```nunjucks
{% call scrollbar(id='scrollbar1') -%}
    scrollbar
{% endcall %}
```
Output:
```html
<div id="scrollbar1" class="scrollbar">scrollbar</div>
```

#### class
Nunjucks Files:
```nunjucks
{%- from "scrollbar/scrollbar.html" import scrollbar -%}

{% call scrollbar(class="scrollbar1") -%}
    scrollbar
{% endcall %}
```
Output:
```html
<div class="scrollbar scrollbar1">scrollbar</div>
```

#### dataset
Set dataset value.<br/>
If need set `data-text`<br/>
Nunjucks Files:
```nunjucks
{%- from "scrollbar/scrollbar.html" import scrollbar -%}

{% call scrollbar(dataset={text: "xxx"}) -%}
    scrollbar
{% endcall %}
```
Output:
```html
<div class="scrollbar" data-text="xxx">scrollbar</div>
```

#### options
**modifier**

Add modifier style class by array.<br/>
If need add `scrollbar--overlay`<br/>
Nunjucks Files:
```nunjucks
{%- from "scrollbar/scrollbar.html" import scrollbar -%}

{% call scrollbar(options={modifier: ["overlay"]}) -%}
    scrollbar
{% endcall %}
```
Output:
```html
<div class="scrollbar scrollbar--overlay">scrollbar</div>
```

## scrollbar.mixin.scss
scrollbar style template.

### Getting Started
SCSS Files:
```scss
@import './src/app/scrollbar/scrollbar.mixin.scss';
```

#### @mixin scrollbar($isOverlay: $scrollbar-overlay, $height: $scrollbar-height, $maxHeight: $scrollbar-max-height, $size: $scrollbar-size, $margin: $scrollbar-margin, $padding: $scrollbar-padding, $borderRadius: $scrollbar-border-radius, $trackBackground: $scrollbar-track-background, $slideBackground: $scrollbar-slide-background, $modifier: '')
.scrollbar style.<br/>
SCSS Files:
```scss
@include scrollbar();
```
