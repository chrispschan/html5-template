# imageText
Module of image and text style.

## imageText.html
Nunjucks template.

### macro imageText(id, class, dataset, options)
Create imageText element.<br/>
Nunjucks Files:
```nunjucks
{%- from "imageText/imageText.html" import imageText -%}

{% call imageText() %}Image Text{% endcall %}
```
Output:
```html
<div class="imageText">Image Text</div>
```

#### id
Nunjucks Files:
```nunjucks
{% call imageText(id="imageText1") %}Image Text{% endcall %}
```
Output:
```html
<div id="imageText1" class="imageText">Image Text</div>
```

#### class
Nunjucks Files:
```nunjucks
{% call imageText(class="imageText1") %}Image Text{% endcall %}
```
Output:
```html
<div class="imageText imageText1">Image Text</div>
```

#### dataset
Set dataset value.<br/>
If need set `data-text`<br/>
Nunjucks Files:
```nunjucks
{% call imageText(dataset={text: "xxx"}) %}Image Text{% endcall %}
```
Output:
```html
<div class="imageText" data-text="xxx">Image Text</div>
```

#### options
#####tag
Set element tag.
Nunjucks Files:
```nunjucks
{% call imageText(options={tag: "button"}) %}Image Text{% endcall %}
```
Output:
```html
<button class="imageText">Image Text</button>
```

#####href
Set element href if tag = 'a'.
Nunjucks Files:
```nunjucks
{% call imageText(options={tag: "a", href: "#"}) %}Image Text{% endcall %}
```
Output:
```html
<a class="imageText" href="#">Image Text</a>
```

#####target
Set element target if tag = 'a'.
Nunjucks Files:
```nunjucks
{% call imageText(options={tag: "a", target: "_blank"}) %}Image Text{% endcall %}
```
Output:
```html
<a class="imageText" href="javascript:;" target="_blank">Image Text</a>
```

#####modifier
Add modifier style class by array.<br/>
If need add `imageText--center` and `imageText--horizontal`<br/>
Nunjucks Files:
```nunjucks
{% call imageText(options={modifier: ["center", "horizontal"]}) %}Image Text{% endcall %}
```
Output:
```html
<div class="imageText imageText--center imageText--horizontal">Image Text</div>
```

#####beforeItems
Call `macro itemGenerator(options.beforeItems, options)` to auto create `image/text` element before `caller()`.
Nunjucks Files:
```nunjucks
{% call imageText(options={
    beforeItems: [
        {type: "image", src: "/favicon-32x32.png"}, 
        {type: "text", content: "xxx"}
    ]
}) %}
    Image Text
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image">
        <img class="imageText__image__item" src="/favicon-32x32.png" alt="" />
    </div>
    <div class="imageText__text">
        <p class="imageText__text__item">xxx</p>
    </div>
    Image Text
</div>
```

#####afterItems
Call `macro itemGenerator(options.afterItems, options)` to auto create `image/text` element after `caller()`.
Nunjucks Files:
```nunjucks
{% call imageText(options={
    afterItems: [
        {type: "image", src: "/favicon-32x32.png"}, 
        {type: "text", content: "xxx"}
    ]
}) %}
    Image Text
{% endcall %}
```
Output:
```html
<div class="imageText">
    Image Text
    <div class="imageText__image">
        <img class="imageText__image__item" src="/favicon-32x32.png" alt="" />
    </div>
    <div class="imageText__text">
        <p class="imageText__text__item">xxx</p>
    </div>
</div>
```

### macro image(id, class, src, dataset, options)
Create imageText__image element.<br/>
Nunjucks Files:
```nunjucks
{%- from "imageText/imageText.html" import imageText, image -%}

{% call imageText() %}
    {{ image() }}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image">
        <img class="imageText__image__item" src="" alt="" />
    </div>
</div>
```

#### id
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {{ image(id="image1") }}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div id="image1" class="imageText__image">
        <img class="imageText__image__item" src="" alt="" />
    </div>
</div>
```

#### class
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {{ image(class="image1") }}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image image1">
        <img class="imageText__image__item" src="" alt="" />
    </div>
</div>
```

#### src
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {{ image(src="image.png") }}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image">
        <img class="imageText__image__item" src="image.png" alt="" />
    </div>
</div>
```

#### dataset
Set dataset value.<br/>
If need set `data-text`<br/>
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {{ image(dataset={text: "xxx"}) }}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image" data-text="xxx">
        <img class="imageText__image__item" src="" alt="" />
    </div>
</div>
```

#### options
#####alt
Set image alt.
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {{ image(options={alt: "xxx"}) }}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image">
        <img class="imageText__image__item" src="" alt="xxx" />
    </div>
</div>
```

#####width
Set image width.
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {{ image(options={width: 320}) }}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image">
        <img class="imageText__image__item" src="" alt="" width="320" />
    </div>
</div>
```

#####height
Set image height.
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {{ image(options={height: 320}) }}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image">
        <img class="imageText__image__item" src="" alt="" height="320" />
    </div>
</div>
```

#####tag
Set element tag.
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {{ image(options={tag: "button"}) }}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <button class="imageText__image">
        <img class="imageText__image__item" src="" alt="" />
    </button>
</div>
```

#####href
Set element href if tag = 'a'.
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {{ image(options={tag: "a", href: "#"}) }}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <a class="imageText__image" href="#">
        <img class="imageText__image__item" src="" alt="" />
    </a>
</div>
```

#####target
Set element target if tag = 'a'.
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {{ image(options={tag: "a", target: "_blank"}) }}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <a class="imageText__image" href="javascript:;" target="_blank">
        <img class="imageText__image__item" src="" alt="" />
    </a>
</div>
```

#####align
Add align modifier class.<br/>
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {{ image(options={align: "center"}) }}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image imageText__image--center">
        <img class="imageText__image__item" src="" alt="" />
    </div>
</div>
```

#####background
Set image to background if imageText--inside<br/>
Nunjucks Files:
```nunjucks
{% call imageText(options={modifier: ["inside"]}) %}
    {{ image(options={background: true}) }}
{% endcall %}
```
Output:
```html
<div class="imageText imageText--inside">
    <div class="imageText__image imageText__image--background">
        <img class="imageText__image__item" src="" alt="" />
    </div>
</div>
```

### macro text(id, class, dataset, options)
Create imageText__text element.<br/>
Nunjucks Files:
```nunjucks
{%- from "imageText/imageText.html" import imageText, text -%}

{% call imageText() %}
    {% call text() %}Text{% endcall %}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">Text</div>
</div>
```

#### id
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {% call text(id="text1") %}Text{% endcall %}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div id="text1" class="imageText__text">Text</div>
</div>
```

#### class
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {% call text(class="text1") %}Text{% endcall %}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text text1">Text</div>
</div>
```

#### dataset
Set dataset value.<br/>
If need set `data-text`<br/>
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {% call text(dataset={text: "xxx"}) %}Text{% endcall %}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text" data-text="xxx">Text</div>
</div>
```

#### options
#####tag
Set element tag.
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {% call text(options={tag: "button"}) %}Text{% endcall %}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <button class="imageText__text">Text</button>
</div>
```

#####href
Set element href if tag = 'a'.
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {% call text(options={tag: "a", href: "#"}) %}Text{% endcall %}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <a class="imageText__text" href="#">Text</a>
</div>
```

#####target
Set element target if tag = 'a'.
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {% call text(options={tag: "a", target: "_blank"}) %}Text{% endcall %}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <a class="imageText__text" href="javascript:;" target="_blank">Text</a>
</div>
```

#####align
Add align modifier class.<br/>
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {% call text(options={align: "center"}) %}Text{% endcall %}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text imageText__text--center">Text</div>
</div>
```

### macro textItem(id, class, dataset, options)
Create imageText__text__item element.<br/>
Nunjucks Files:
```nunjucks
{%- from "imageText/imageText.html" import imageText, text, textItem -%}

{% call imageText() %}
    {% call text() %}
        {% call textItem() %}Text{% endcall %}
    {% endcall %}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <p class="imageText__text__item">Text</p>
    </div>
</div>
```

#### id
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {% call text() %}
        {% call textItem(id="text1") %}Text{% endcall %}
    {% endcall %}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <p id="text1" class="imageText__text__item">Text</p>
    </div>
</div>
```

#### class
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {% call text() %}
        {% call textItem(class="text1") %}Text{% endcall %}
    {% endcall %}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <p class="imageText__text__item text1">Text</p>
    </div>
</div>
```

#### dataset
Set dataset value.<br/>
If need set `data-text`<br/>
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {% call text() %}
        {% call textItem(dataset={text: "xxx"}) %}Text{% endcall %}
    {% endcall %}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <p class="imageText__text__item" data-text="xxx">Text</p>
    </div>
</div>
```

#### options
#####tag
Set element tag.
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {% call text() %}
        {% call textItem(options={tag: "div"}) %}Text{% endcall %}
    {% endcall %}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <div class="imageText__text__item">Text</div>
    </div>
</div>
```

#####href
Set element href if tag = 'a'.
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {% call text() %}
        {% call textItem(options={tag: "a", href: "#"}) %}Text{% endcall %}
    {% endcall %}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <a class="imageText__text__item" href="#">Text</a>
    </div>
</div>
```

#####target
Set element target if tag = 'a'.
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {% call text() %}
        {% call textItem(options={tag: "a", target: "_blank"}) %}Text{% endcall %}
    {% endcall %}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <a class="imageText__text__item" href="javascript:;" target="_blank">Text</a>
    </div>
</div>
```

### macro itemGenerator(items, options)
Auto create imageText__image/imageText__text element(s) by items.<br/>
Nunjucks Files:
```nunjucks
{%- from "imageText/imageText.html" import imageText, itemGenerator -%}

{% call imageText() %}
    {{ itemGenerator(items=[
        {type: "image", src: "/favicon-32x32.png"}, 
        {type: "text", content: "xxx"}
    ]) }}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image">
        <img class="imageText__image__item" src="/favicon-32x32.png" alt="" />
    </div>
    <div class="imageText__text">
        <p class="imageText__text__item">xxx</p>
    </div>
</div>
```

#### items
Create items array. All items can set owner options.
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {{ itemGenerator(items=[
        {
            type: "image", src: "/favicon-32x32.png", 
            id: "image1",
            options: {
                tag: "button"    
            }
        }, 
        {
            type: "text", content: "xxx",
            id: "text1", 
            options: {
                tag: "span"    
            }
        }
    ]) }}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <button id="image1" class="imageText__image">
        <img class="imageText__image__item" src="/favicon-32x32.png" alt="" />
    </button>
    <span id="text1" class="imageText__text">
        <span class="imageText__text__item">xxx</span>
    </span>
</div>
```

#### options
Global options for all items
Nunjucks Files:
```nunjucks
{% call imageText() %}
    {{ itemGenerator(items=[
        {type: "image", src: "/favicon-32x32.png"}, 
        {type: "text", content: "xxx"}
    ],
    options={
        tag: "span"
    }) }}
{% endcall %}
```
Output:
```html
<div class="imageText">
    <span class="imageText__image">
        <img class="imageText__image__item" src="/favicon-32x32.png" alt="" />
    </span>
    <span class="imageText__text">
        <span class="imageText__text__item">xxx</span>
    </span>
</div>
```

#####afterItems
Call `macro itemGenerator(options.afterItems, options)` to auto create `image/text` element after `caller()`.
Nunjucks Files:
```nunjucks
{% call imageText(options={
    afterItems: [
        {type: "image", src: "/favicon-32x32.png"}, 
        {type: "text", content: "xxx"}
    ]
}) %}
    Image Text
{% endcall %}
```
Output:
```html
<div class="imageText">
    Image Text
    <div class="imageText__image">
        <img class="imageText__image__item" src="/favicon-32x32.png" alt="" />
    </div>
    <div class="imageText__text">
        <p class="imageText__text__item">xxx</p>
    </div>
</div>
```

## map.handlebars
Handlebars template.

### Getting Started
Handlebars Files:
```handlebars
{{> map/map}}
```
Output:
```html
<div class="map"></div>
```

#### Set id
Handlebars Files:
```handlebars
{{> map/map id="map1"}}
```
Output:
```html
<div id="map1" class="map"></div>
```

#### Set class
Handlebars Files:
```handlebars
{{> map/map class="map1"}}
```
Output:
```html
<div class="map map1"></div>
```

#### Set dataset
If need set `data-map-clickable-icons`<br/>
Handlebars Files:
```handlebars
{{#setVal}}
    dataset:dataset = {"clickableIcons": "false"}
{{/setVal}}
{{> map/map dataset=@local.dataset}}
```
Output:
```html
<div class="map" data-map-clickable-icons="false"></div>
```

##### Set not support message (< IE9)
Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"notSupport": "Not Support Google Maps"}
{{/setVal}}
{{> map/map options=@local.options}}
```
Output:
```html
<div class="map"><!--[if lte IE 9]><p class="map__msg">Not Support Google Maps</p><![endif]--></div>
```

## map.scss
Map style template.

### Getting Started
SCSS Files:
```scss
@import './src/app/map/map.mixin.scss';
```

#### @mixin map($proportion: $map-proportion, $width: 100%, $height: 0)
.map style.<br/>
SCSS Files:
```scss
@include map();
```
Output:
```css
.map {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 56.25%;
}
.map__msg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
}
```

##### $proportion
- .map proportion
- default $map-proportion: (16, 9) - 16:9
SCSS Files:
```scss
@include map($proportion: (4, 3));
```
Output:
```css
.map {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 75%;
}
.map__msg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
}
```

##### $width
- .map width
- default 100%
SCSS Files:
```scss
@include map($width: 500px);
```
Output:
```css
.map {
    position: relative;
    width: 500px;
    height: 0;
    padding-top: 281.25px;
}
.map__msg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
}
```

##### $height
- .map height
- default 0
- if $height != 0, $proportion will not calculation
SCSS Files:
```scss
@include map($height: 500px);
```
Output:
```css
.map {
    position: relative;
    width: 100%;
    height: 500px;
    padding-top: 0;
}
.map__msg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
}
```

##### Add Custom Style
SCSS Files:
```scss
@include map() {
    margin-top: 20px;

    &__input {
        width: 100px;
    }
}
```
Output:
```css
.map {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 56.25%;
    margin-top: 20px;
}
.map__msg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
}
.map__input {
    width: 100px;
}
```

#### @mixin setEleSize($proportion: (16, 9), $width: 100%, $height: 0, $resetPadding: false)
Return size style without element.<br/>
SCSS Files:
```scss
.ele {
    @include setEleSize();
}
```
Output:
```css
.ele {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 56.25%;
}
```

##### $proportion
- element proportion
- default $map-proportion: (16, 9) - 16:9
SCSS Files:
```scss
.ele {
    @include setEleSize($proportion:(4, 3));
}
```
Output:
```css
.ele {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 75%;
}
```

##### $width
- element width
- default 100%
SCSS Files:
```scss
.ele {
    @include setEleSize($width: 500px);
}
```
Output:
```css
.ele {
    position: relative;
    width: 500px;
    height: 0;
    padding-top: 281.25px;
}
```

##### $height
- element height
- default 0
- if $height != 0, $proportion will not calculation
SCSS Files:
```scss
.ele {
    @include setEleSize($height: 500px);
}
```
Output:
```css
.ele {
    position: relative;
    width: 100%;
    height: 500px;
}
```

##### $resetPadding
- if $height != 0, need reset padding-top to 0 
SCSS Files:
```scss
.ele {
    @include setEleSize($height: 500px);
}
```
Output:
```css
.ele {
    position: relative;
    width: 100%;
    height: 500px;
    padding-top: 0;
}
```
