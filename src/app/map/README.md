# Map
Module of [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/).

## map.class.js
Class of some usaful use Google Maps functions.

### Getting Started
```js
import Map from 'map/map.class';

const map = new Map();
```

### Map (map = '.map', options = {})
#### map
Google Maps element.

#### options
- [Google Maps options](https://developers.google.com/maps/documentation/javascript/reference#MapOptions)
- key: string (default: '') - load Google Maps Javascript API key if html not load the API
- language: string (default: '') - load Google Maps Javascript API language if html not load the API
- region: string (default: '') - load Google Maps Javascript API region if html not load the API
- zoom: number (default: 10) - Maps default zoom value
- center: object (default: {lat: 22.28552, lng: 114.15769}) - Maps default center
- geolocation: boolean (default: false) - use geolocation
- geolocationOption: object (default: {})
    - [position options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions)
    - marker: boolean - cerate marker to geolocation
- events: object (default: {}) - add event listeners to map
    - ([event](https://developers.google.com/maps/documentation/javascript/events)): function (event, self)
- markers: object | [object] - cerate markers to map
    - position: object - marker position
        - lat: number
        - lng: number
    - events: object - add event listeners to marker
        - ([event](https://developers.google.com/maps/documentation/javascript/events)): function (event, self)
    - layer: number (default: 0) - cerate markers layer

#### dataset
Some options can use element dataset setting:
- data-map-background-color: string (e.g.: `'#000000'`)
- data-map-center: string (e.g.: `'22.28552, 114.15769'`)
- data-map-clickable-icons: string = `'true' | 'false'`
- data-map-disable-default-ui: string = `'true' | 'false'`
- data-map-disable-double-click-zoom: string = `'true' | 'false'`
- data-map-draggable: string = `'true' | 'false'`
- data-map-draggable-cursor: string (e.g.: `'url(http://www.example.com/icon.png'), auto;'`)
- data-map-dragging-cursor: string (e.g.: `'url(http://www.example.com/icon.png), auto'`)
- data-map-fullscreen-control: string = `'true' | 'false'`
- data-map-heading: string (e.g.: `'45'`)
- data-map-keyboard-shortcuts: string = `'true' | 'false'`
- data-map-map-type-control: string = `'true' | 'false'`
- data-map-map-type-id: string (e.g.: `'map1'`)
- data-map-max-zoom: string (e.g.: `'18'`)
- data-map-min-zoom: string (e.g.: `'12'`)
- data-map-no-clear: string = `'true' | 'false'`
- data-map-pan-control: string = `'true' | 'false'`
- data-map-rotate-control: string = `'true' | 'false'`
- data-map-scale-control: string = `'true' | 'false'`
- data-map-scrollwheel: string = `'true' | 'false'`
- data-map-sign-in-control: string = `'true' | 'false'`
- data-map-street-view-control: string = `'true' | 'false'`
- data-map-tilt: string (e.g.: `'10'`)
- data-map-zoom: string (e.g.: `'12'`)
- data-map-zoom-control: string = `'true' | 'false'`
- data-map-geolocation: string = `'true' | 'false'`

### Map.waitReady (callback)
Wait the maps setup ready and run call back function.

### Map.setZoom (zoom, index = -1)
Set maps zoom value.

#### zoom: number
Zoom value.

#### index: number
Map.map array index (-1 = all).

### Map.setCenter (center, panTo = true, index = -1)
Set maps center.

#### center: object
- lat: number
- lng: number

#### panTo: boolean
With pan animation.

#### index: number
Map.map array index (-1 = all).

### Map.addEvents (options, index = -1)
Add events listeners to maps

#### options: object
- ([event](https://developers.google.com/maps/documentation/javascript/events)): function (event, self)

#### index: number
Map.map array index (-1 = all).

### Map.addMarkers (markers, index = -1)
Cerate markers to maps

#### markers: object
- position: object - marker position
    - lat: number
    - lng: number
- events: object - add event listeners to marker
    - ([event](https://developers.google.com/maps/documentation/javascript/events)): function (event, self)
- layer: number (default: 0) - cerate markers layer

#### index: number
Map.map array index (-1 = all).

### Map.toggleLayer (options, layer = -1, index = -1)
Show / hide markers of layer.

#### options: object
- show: boolean (default: true) - set layer to show
- remove: boolean (default: false) - remove layer

#### layer: number
Map.layer array index (-1 = all).

#### index: number
Map.map array index (-1 = all).

### Map.toggleMarker (options, marker)
Show / hide marker.

#### options: object
- show: boolean (default: true) - set layer to show
- remove: boolean (default: false) - remove layer

#### marker: string | object
Search by marker id or toggle marker object.

### Map.nearMarkers (center, radius = 1, layer = -1, index = -1)
Find near center markers.</br>
Return markers: array

#### center: object
- lat: number
- lng: number

#### radius: number
Search range radius. Unit is km.

#### layer: number
Map.layer array index (-1 = all).

#### index: number
Map.map array index (-1 = all).

### Map.map: array
Return all maps object.

### Map.layer: array
Return all layers markers object.

### Map.zoom: array
Return all maps zoom value.

### Map.center: array
Return all maps center object.

### Map.ready: boolean
Return is the maps setup ready.

## map.html
Nunjucks template.

### Getting Started
Nunjucks Files:
```nunjucks
{%- from "map/map.html" import map -%}

{{ map() }}
```
Output:
```html
<div class="map"></div>
```

### macro map(id, class, options)

#### id
Nunjucks Files:
```nunjucks
{{ map(id='map1') }}
```
Output:
```html
<div id='map1' class="map"></div>
```

#### class
Nunjucks Files:
```nunjucks
{{ map(class='map1') }}
```
Output:
```html
<div class="map map1"></div>
```

#### options
Set dataset value and not support message (< IE9).

##### Set dataset
If need set `data-map-clickable-icons`<br/>
Nunjucks Files:
```nunjucks
{{ map(options={clickableIcons="false"}) }}
```
Output:
```html
<div class="map" data-map-clickable-icons="false"></div>
```

##### Set not support message (< IE9)
Nunjucks Files:
```nunjucks
{{ map(options={notSupport="Not Support Google Maps"}) }}
```
Output:
```html
<div class="map"><!--[if lte IE 9]><p class="map__msg">Not Support Google Maps</p><![endif]--></div>
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
{{> map/map clickableIcons="false"}}
```
Output:
```html
<div class="map" data-map-clickable-icons="false"></div>
```

##### Set not support message (< IE9)
Handlebars Files:
```handlebars
{{> map/map notSupport="Not Support Google Maps"}}
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
@import './src/app/map/map';
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
