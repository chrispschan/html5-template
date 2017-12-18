# HTML Content Data
Use Macro export JSON files.

## Getting Started
### Export Content JSON
1. Open .xlsm file
2. Developer > Macros *
    - Cannot find Developer tab
        1. File > Options
        2. Customize Ribbon
        3. Select 'Developer'
        4. Click 'OK'
3. Choose 'export_in_json_format.export_in_json_format'
4. Click 'Run'
5. Save file
* If cannot run the macros, it maybe the excel macros setting disable. you need [enable macros in excel](http://www.exceltrick.com/how_to/enable-macros-in-excel/).

#### JSON Format
```json
{
    "sheet1 name":[
        {
            "sheet1 cell A1":"sheet1 cell A2",
            "sheet1 cell B1":"sheet1 cell B2",
            "sheet1 cell C1":"sheet1 cell C2",...
        },
        {
            "sheet1 cell A1":"sheet1 cell A3",
            "sheet1 cell B1":"sheet1 cell B3",
            "sheet1 cell C1":"sheet1 cell C3",...
        },...
    ],
    "sheet2 name":[
        {
            "sheet2 cell A1":"sheet2 cell A2",
            "sheet2 cell B1":"sheet2 cell B2",
            "sheet2 cell C1":"sheet2 cell C2",...
        },
        {
            "sheet2 cell A1":"sheet2 cell A3",
            "sheet2 cell B1":"cell B3",
            "sheet2 cell C1":"sheet2 cell C3",...
        },...
    ],...
}
```

### Call Content JSON
src/data/index.json
```json
{
    "content": [
        {"id": "h1", "en": "Demo", "zh": "範例"},
        {"id": "list", "en": "item 1", "zh": "項目 1"},
        {"id": "list", "en": "item 2", "zh": "項目 2"},
        {"id": "list", "en": "item 3", "zh": "項目 3"}
    ]
}
```
Nunjucks Files
```nunjucks
{% set page=index %}

<h1>
    {%- for i in page.content | findContent('h1', 'en') -%}
        {{- i | safe -}}
    {%- endfor -%}
</h1>

{%- for i in page.content | findContent('', 'en') -%}
    <p>{{- i | safe -}}</p>
{%- endfor -%}

{%- for i in page.content | findContent('list', 'en') -%}
    {% if loop.first %}<ul>{% endif %}
        <li>{{- i | safe -}}</li>
    {% if loop.last %}</ul>{% endif %}
{%- endfor -%}
```
Handlebars Files
```handlebars
{{#setVal}}
    page:object = index;
{{/setVal}}

<h1>
    {{~#eachContent @local.page.content "h1" "en" ~}}
        {{{this}}}
    {{~/eachContent~}}
</h1>

{{#eachContent @local.page.content "" "en"}}
    <p>{{{this}}}</p>
{{/eachContent}}

{{#eachContent @local.page.content "list" "en"}}
    {{#if @showFirst}}<ul>{{/if}}
        <li>{{{this}}}</li>
    {{#if @showLast}}</ul>{{/if}}
{{/eachContent}}
```
Output HTML
```html
<h1>Demo</h1>

<p>Demo</p>
<p>item 1</p>
<p>item 2</p>
<p>item 3</p>

<ul>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
</ul>
```
