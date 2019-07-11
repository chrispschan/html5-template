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
**tag**

Set element tag.
Nunjucks Files:
```nunjucks
{% call imageText(options={tag: "button"}) %}Image Text{% endcall %}
```
Output:
```html
<button class="imageText">Image Text</button>
```

**href**

Set element href if tag = 'a'.
Nunjucks Files:
```nunjucks
{% call imageText(options={tag: "a", href: "#"}) %}Image Text{% endcall %}
```
Output:
```html
<a class="imageText" href="#">Image Text</a>
```

**target**

Set element target if tag = 'a'.
Nunjucks Files:
```nunjucks
{% call imageText(options={tag: "a", target: "_blank"}) %}Image Text{% endcall %}
```
Output:
```html
<a class="imageText" href="javascript:;" target="_blank">Image Text</a>
```

**modifier**

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

**beforeItems**

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

**afterItems**

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
**alt**

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

**width**

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

**height**

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

**tag**

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

**href**

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

**target**

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

**align**

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

**background**

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
**tag**

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

**href**

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

**target**

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

**align**

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
**tag**

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

**href**

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

**target**

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

## imageText.handlebars
Handlebars template for create imageText element.<br/>
Handlebars Files:
```handlebars
{{#> imageText/imageText}}Image Text{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">Image Text</div>
```

#### Set id
Handlebars Files:
```handlebars
{{#> imageText/imageText id="imageText1"}}Image Text{{/imageText/imageText}}
```
Output:
```html
<div id="imageText1" class="imageText">Image Text</div>
```

#### Set class
Handlebars Files:
```handlebars
{{#> imageText/imageText class="imageText1"}}Image Text{{/imageText/imageText}}
```
Output:
```html
<div class="imageText imageText1">Image Text</div>
```

#### Set dataset
If need set `data-text`<br/>
Handlebars Files:
```handlebars
{{#setVal}}
    dataset:dataset = {"text": "xxx"};
{{/setVal}}
{{#> imageText/imageText dataset=@local.dataset}}Image Text{{/imageText/imageText}}
```
Output:
```html
<div class="imageText" data-text="xxx">Image Text</div>
```

**Set tag**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"tag": "button"};
{{/setVal}}
{{#> imageText/imageText options=@local.options}}Image Text{{/imageText/imageText}}
```
Output:
```html
<button class="imageText">Image Text</button>
```

**Set href if tag = 'a'**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"tag": "a", "href": "#"};
{{/setVal}}
{{#> imageText/imageText options=@local.options}}Image Text{{/imageText/imageText}}
```
Output:
```html
<a class="imageText" href="#">Image Text</a>
```

**Set target if tag = 'a'**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"tag": "a", "target": "_blank"};
{{/setVal}}
{{#> imageText/imageText options=@local.options}}Image Text{{/imageText/imageText}}
```
Output:
```html
<a class="imageText" href="javascript:;" target="_blank">Image Text</a>
```

**Set modifier style class by array**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"modifier": ["center", "horizontal"]};
{{/setVal}}
{{#> imageText/imageText options=@local.options}}Image Text{{/imageText/imageText}}
```
Output:
```html
<div class="imageText imageText--center imageText--horizontal">Image Text</div>
```

**Call `imageText/itemGenerator` to auto create `image/text` element before `{{>****

 @partial-block }}`.
Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {
        "beforeItems": [
            {"type": "image", "src": "/favicon-32x32.png"}, 
            {"type": "text", "content": "xxx"}
        ]
    };
{{/setVal}}
{{#> imageText/imageText options=@local.options}}
    Image Text
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image">
        <img class="imageText__image__item" src="/favicon-32x32.png" alt="" />
    </div>
    <div class="imageText__text">
        <p class="imageText__text__item">xxx</p>
    </div> Image Text
</div>
```

**Call `imageText/itemGenerator` to auto create `image/text` element after `{{>****

 @partial-block }}`.
Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {
        "afterItems": [
            {"type": "image", "src": "/favicon-32x32.png"}, 
            {"type": "text", "content": "xxx"}
        ]
    };
{{/setVal}}
{{#> imageText/imageText options=@local.options}}
    Image Text
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText"> Image Text
    <div class="imageText__image">
        <img class="imageText__image__item" src="/favicon-32x32.png" alt="" />
    </div>
    <div class="imageText__text">
        <p class="imageText__text__item">xxx</p>
    </div>
</div>
```

## image.handlebars
Handlebars template for create imageText__image element.<br/>
Handlebars Files:
```handlebars
{{#> imageText/imageText}}
    {{> imageText/image}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image">
        <img class="imageText__image__item" src="" alt="" />
    </div>
</div>
```

#### Set id
Handlebars Files:
```handlebars
{{#> imageText/imageText}}
    {{> imageText/image id="image1"}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div id="image1" class="imageText__image">
        <img class="imageText__image__item" src="" alt="" />
    </div>
</div>
```

#### Set class
Handlebars Files:
```handlebars
{{#> imageText/imageText}}
    {{> imageText/image class="image1"}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image image1">
        <img class="imageText__image__item" src="" alt="" />
    </div>
</div>
```

#### Set src
Handlebars Files:
```handlebars
{{#> imageText/imageText}}
    {{> imageText/image src="image.png"}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image">
        <img class="imageText__image__item" src="image.png" alt="" />
    </div>
</div>
```

#### Set dataset
If need set `data-text`<br/>
Handlebars Files:
```handlebars
{{#setVal}}
    dataset:dataset = {"text": "xxx"};
{{/setVal}}
{{#> imageText/imageText}}
    {{> imageText/image dataset=@local.dataset}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image" data-text="xxx">
        <img class="imageText__image__item" src="" alt="" />
    </div>
</div>
```

**Set alt**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"alt": "xxx"};
{{/setVal}}
{{#> imageText/imageText}}
    {{> imageText/image options=@local.options}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image">
        <img class="imageText__image__item" src="" alt="xxx" />
    </div>
</div>
```

**Set width**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"width": 320};
{{/setVal}}
{{#> imageText/imageText}}
    {{> imageText/image options=@local.options}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image">
        <img class="imageText__image__item" src="" alt="" width="320" />
    </div>
</div>
```

**Set height**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"height": 320};
{{/setVal}}
{{#> imageText/imageText}}
    {{> imageText/image options=@local.options}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image">
        <img class="imageText__image__item" src="" alt="" height="320" />
    </div>
</div>
```

**Set tag**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"tag": "button"};
{{/setVal}}
{{#> imageText/imageText}}
    {{> imageText/image options=@local.options}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <button class="imageText__image">
        <img class="imageText__image__item" src="" alt="" />
    </button>
</div>
```

**Set href if tag = 'a'**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"tag": "a", "href": "#"};
{{/setVal}}
{{#> imageText/imageText}}
    {{> imageText/image options=@local.options}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <a class="imageText__image" href="#">
        <img class="imageText__image__item" src="" alt="" />
    </a>
</div>
```

**Set target if tag = 'a'**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"tag": "a", "target": "_blank"};
{{/setVal}}
{{#> imageText/imageText}}
    {{> imageText/image options=@local.options}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <a class="imageText__image" href="javascript:;" target="_blank">
        <img class="imageText__image__item" src="" alt="" />
    </a>
</div>
```

**Set align modifier class**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"align": "center"};
{{/setVal}}
{{#> imageText/imageText}}
    {{> imageText/image options=@local.options}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__image imageText__image--center">
        <img class="imageText__image__item" src="" alt="" />
    </div>
</div>
```

**Set image to background if imageText--inside**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"modifier": ["inside"]};
    imgOptions:json = {"background": true};
{{/setVal}}
{{#> imageText/imageText options=@local.options}}
    {{> imageText/image options=@local.imgOptions}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText imageText--inside">
    <div class="imageText__image imageText__image--background">
        <img class="imageText__image__item" src="" alt="" />
    </div>
</div>
```

## text.handlebars
Handlebars template for create imageText__text element.<br/>
Handlebars Files:
```handlebars
{{#> imageText/imageText}}
    {{#> imageText/text}}Text{{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">Text</div>
</div>
```

#### Set id
Handlebars Files:
```handlebars
{{#> imageText/imageText}}
    {{#> imageText/text id="text1"}}Text{{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div id="text1" class="imageText__text">Text</div>
</div>
```

#### Set class
Handlebars Files:
```handlebars
{{#> imageText/imageText}}
    {{#> imageText/text class="text1"}}Text{{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text text1">Text</div>
</div>
```

#### Set dataset
If need set `data-text`<br/>
Handlebars Files:
```handlebars
{{#setVal}}
    dataset:dataset = {"text": "xxx"};
{{/setVal}}
{{#> imageText/imageText}}
    {{#> imageText/text dataset=@local.dataset}}Text{{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text" data-text="xxx">Text</div>
</div>
```

**Set tag**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"tag": "button"};
{{/setVal}}
{{#> imageText/imageText}}
    {{#> imageText/text options=@local.options}}Text{{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <button class="imageText__text">Text</button>
</div>
```

**Set href if tag = 'a'**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"tag": "a", "href": "#"};
{{/setVal}}
{{#> imageText/imageText}}
    {{#> imageText/text options=@local.options}}Text{{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <a class="imageText__text" href="#">Text</a>
</div>
```

**Set target if tag = 'a'**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"tag": "a", "target": "_blank"};
{{/setVal}}
{{#> imageText/imageText}}
    {{#> imageText/text options=@local.options}}Text{{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <a class="imageText__text" href="javascript:;" target="_blank">Text</a>
</div>
```

**Set align modifier class**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"align": "center"};
{{/setVal}}
{{#> imageText/imageText}}
    {{#> imageText/text options=@local.options}}Text{{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text imageText__text--center">Text</div>
</div>
```

## textItem.handlebars
Handlebars template for create imageText__text__item element.<br/>
Handlebars Files:
```handlebars
{{#> imageText/imageText}}
    {{#> imageText/text}}
        {{#> imageText/textItem}}Text{{/imageText/textItem}}
    {{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <p class="imageText__text__item">Text</p>
    </div>
</div>
```

#### Set id
Handlebars Files:
```handlebars
{{#> imageText/imageText}}
    {{#> imageText/text}}
        {{#> imageText/textItem id="text1"}}Text{{/imageText/textItem}}
    {{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <p id="text1" class="imageText__text__item">Text</p>
    </div>
</div>
```

#### Set class
Handlebars Files:
```handlebars
{{#> imageText/imageText}}
    {{#> imageText/text}}
        {{#> imageText/textItem class="text1"}}Text{{/imageText/textItem}}
    {{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <p class="imageText__text__item text1">Text</p>
    </div>
</div>
```

#### Set dataset
If need set `data-text`<br/>
Handlebars Files:
```handlebars
{{#setVal}}
    dataset:dataset = {"text": "xxx"};
{{/setVal}}
{{#> imageText/imageText}}
    {{#> imageText/text}}
        {{#> imageText/textItem dataset=@local.dataset}}Text{{/imageText/textItem}}
    {{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <p class="imageText__text__item" data-text="xxx">Text</p>
    </div>
</div>
```

**Set tag**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"tag": "div"};
{{/setVal}}
{{#> imageText/imageText}}
    {{#> imageText/text}}
        {{#> imageText/textItem options=@local.options}}Text{{/imageText/textItem}}
    {{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <div class="imageText__text__item">Text</div>
    </div>
</div>
```

**Set href if tag = 'a'**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"tag": "a", "href": "#"};
{{/setVal}}
{{#> imageText/imageText}}
    {{#> imageText/text}}
        {{#> imageText/textItem options=@local.options}}Text{{/imageText/textItem}}
    {{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <a class="imageText__text__item" href="#">Text</a>
    </div>
</div>
```

**Set target if tag = 'a'**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"tag": "a", "target": "_blank"};
{{/setVal}}
{{#> imageText/imageText}}
    {{#> imageText/text}}
        {{#> imageText/textItem options=@local.options}}Text{{/imageText/textItem}}
    {{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <a class="imageText__text__item" href="javascript:;" target="_blank">Text</a>
    </div>
</div>
```

## itemGenerator.handlebars
Handlebars template for auto create imageText__image/imageText__text element(s) by items..<br/>
Handlebars Files:
```handlebars
{{#setVal}}
    items:json = [
        {"type": "image", "src": "/favicon-32x32.png"}, 
        {"type": "text", "content": "xxx"}
    ];
{{/setVal}}
{{#> imageText/imageText}}
    {{> imageText/itemGenerator items=@local.items}}
{{/imageText/imageText}}
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

#### Set items owner options.
Handlebars Files:
```handlebars
{{#setVal}}
    items:json = [
        {
            "type": "image", "src": "/favicon-32x32.png",
            "id": "image1",
            "options": {
                "tag": "botton"
            }
        }, 
        {
            "type": "text", "content": "xxx",
            "id": "text1",
            "options": {
                "tag": "span"
            }
        }
    ];
{{/setVal}}
{{#> imageText/imageText}}
    {{> imageText/itemGenerator items=@local.items}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <botton id="image1" class="imageText__image">
        <img class="imageText__image__item" src="/favicon-32x32.png" alt="" />
    </botton>
    <span id="text1" class="imageText__text">
        <span class="imageText__text__item">xxx</span>
    </span>
</div>
```

#### Set global options for all items
Handlebars Files:
```handlebars
{{#setVal}}
    items:json = [
        {"type": "image", "src": "/favicon-32x32.png"}, 
        {"type": "text", "content": "xxx"}
    ];
    options:json = {
        "tag": "span"
    };
{{/setVal}}
{{#> imageText/imageText}}
    {{> imageText/itemGenerator items=@local.items options=@local.options}}
{{/imageText/imageText}}
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

#### Set dataset
If need set `data-text`<br/>
Handlebars Files:
```handlebars
{{#setVal}}
    dataset:dataset = {"text": "xxx"};
{{/setVal}}
{{#> imageText/imageText}}
    {{#> imageText/text}}
        {{#> imageText/textItem dataset=@local.dataset}}Text{{/imageText/textItem}}
    {{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <p class="imageText__text__item" data-text="xxx">Text</p>
    </div>
</div>
```

**Set tag**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"tag": "div"};
{{/setVal}}
{{#> imageText/imageText}}
    {{#> imageText/text}}
        {{#> imageText/textItem options=@local.options}}Text{{/imageText/textItem}}
    {{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <div class="imageText__text__item">Text</div>
    </div>
</div>
```

**Set href if tag = 'a'**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"tag": "a", "href": "#"};
{{/setVal}}
{{#> imageText/imageText}}
    {{#> imageText/text}}
        {{#> imageText/textItem options=@local.options}}Text{{/imageText/textItem}}
    {{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <a class="imageText__text__item" href="#">Text</a>
    </div>
</div>
```

**Set target if tag = 'a'**

Handlebars Files:
```handlebars
{{#setVal}}
    options:json = {"tag": "a", "target": "_blank"};
{{/setVal}}
{{#> imageText/imageText}}
    {{#> imageText/text}}
        {{#> imageText/textItem options=@local.options}}Text{{/imageText/textItem}}
    {{/imageText/text}}
{{/imageText/imageText}}
```
Output:
```html
<div class="imageText">
    <div class="imageText__text">
        <a class="imageText__text__item" href="javascript:;" target="_blank">Text</a>
    </div>
</div>
```

## imageText.mixin.scss
imageText style template.

### Getting Started
SCSS Files:
```scss
@import './src/app/imageText/imageText.mixin.scss';
```

#### @mixin imageText($defaultType: $imageText-default-type, $defaultOnly: $imageText-default-only)
.imageText style.<br/>
SCSS Files:
```scss
@include imageText();
```
Output:
`.imageText`, `.imageText--horizontal`, `.imageText--inline`, `.imageText--inside`, `.imageText--center`, `.imageText--right`, `.imageText--middle`, `.imageText--bottom` style

**$defaultType**

- `.imageText` default style
- `"vertical" | "horizontal" | "inline" | "inside"`
- default `$imageText-default-type: "vertical";`
SCSS Files:
```scss
@include imageText($defaultType: "horizontal");
```
Output:
`.imageText`, `.imageText--vertical`, `.imageText--inline`, `.imageText--inside`, `.imageText--center`, `.imageText--right`, `.imageText--middle`, `.imageText--bottom` style

**$defaultOnly**

- only create default type style
- default `$imageText-default-only: false;`
SCSS Files:
```scss
@include imageText($defaultOnly: true);
```
Output:
`.imageText`, `.imageText--center`, `.imageText--right` style

**Add Custom Style**

SCSS Files:
```scss
@include imageText() {
    margin-top: 20px;

    &__custom__item {
        width: 100px;
    }
}
```
Output:
```css
.imageText {
    margin-top: 20px;
}
.imageText__custom__item {
    width: 100px;
}
```

#### @mixin `(vertical | horizontal | inline | inside`-imageText($ele: "", $modifier: "", $itemStyle: false)
.imageText style of type.<br/>
SCSS Files:
```scss
@include vertical-imageText();
```
Output:
`.imageText`, `.imageText--center`, `.imageText--right` style, without `.imageText__text` and `.imageText__image` reset style.

**$ele**

- `#{$ele}.imageText`
- default `""`
SCSS Files:
```scss
@include vertical-imageText($ele: ".test");
```
Output:
`.test.imageText`, `.test.imageText--center`, `.test.imageText--right` style

**$modifier**

- `.imageText#{$modifier}`
- default `""`
SCSS Files:
```scss
@include vertical-imageText($modifier: "--custom");
```
Output:
`.imageText--custom`, `.imageText--custom.imageText--center`, `.imageText--custom.imageText--right` style

**$itemStyle**

- `.imageText__text` and `.imageText__image` reset style
- default `false`
SCSS Files:
```scss
@include vertical-imageText($itemStyle: true);
```
Output:
`.imageText`, `.imageText--center`, `.imageText--right` style, with `.imageText__text` and `.imageText__image` reset style.

**Add Custom Style**

SCSS Files:
```scss
@include vertical-imageText() {
    margin-top: 20px;

    &__custom__item {
        width: 100px;
    }
}
```
Output:
```css
.imageText {
    margin-top: 20px;
}
.imageText__custom__item {
    width: 100px;
}
```

#### Set Responsive Style
**Default type only**

SCSS Files:
```scss
@include imageText($defaultOnly: true);  // default style of type vertical

@media only screen and (max-width: 640px) { // change style to type horizontal when screen width <= 640px
    @include horizontal-imageText();
}
```
**Multi type**

SCSS Files:
```scss
@include imageText();  // create all type style

@media only screen and (max-width: 640px) { // change style when screen width <= 640px
    @include horizontal-imageText();    // all type
    @include vertical-imageText($modifier: "--horizontal");    // horizontal type
    @include inline-imageText($modifier: "--inline");    // inline type
}
```
