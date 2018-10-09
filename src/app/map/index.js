import 'object/object.property';
import 'element/element.property';
import plugin from 'plugin';

// Google Maps
export default class Map extends plugin {
    constructor (map = '.map', options = {}) {
        super(map, options);
        this._options = Object.assign({
            key: '',
            language: '',
            region: '',
            zoom: 10,
            center: {
                lat: 22.28552,
                lng: 114.15769
            }
        }, options);

        this._map = [];

        this._layer = [];

        this._ready = false;

        this._mapEle = document.querySelectorAll(map);

        if (typeof google !== 'undefined') {    // with google api
            this._initMap(this);
        } else {    // without google api
            // google api not ready
            let _api = 'https://maps.googleapis.com/maps/api/js';
            if (this._options.key !== '' || this._options.language !== '' || this._options.region !== '') _api += '?';
            if (this._options.key !== '') _api += 'key=' + this._options.key;
            if (this._options.language !== '' && this._options.key !== '') _api += '&';
            if (this._options.language !== '') _api += 'language=' + this._options.language;
            if (this._options.region !== '' && (this._options.key !== '' || this._options.language !== '')) _api += '&';
            if (this._options.region !== '') _api += 'region=' + this._options.region;
            if (this._options.region === 'cn') _api = _api.replace('https://maps.googleapis.com', 'http://maps.google.cn');
            if (this._options.libraries) {
                _api += _api.search('=') === -1 ? '?libraries=' : '&libraries=';

                for (let i = 0; i < this._options.libraries.length; i++)
                    _api += i === 0 ? this._options.libraries[i] : (',' + this._options.libraries[i]);
            }
            this._loadPlugin(_api, this._initMap);
        }
    }

    _initMap (self) {
        let _options = {};

        for (let i = 0; i < self._mapEle.length; i++) {
            _options = Object.assign({}, self._options);

            delete _options.key;
            delete _options.geolocation;
            delete _options.geolocationOption;
            delete _options.events;
            delete _options.markers;
            delete _options.language;
            delete _options.region;

            self._mapEle[i].getDataset();

            /*----------  self options from dataset  ----------*/
            if (typeof self._mapEle[i].dataset === 'object') {
                for (let key in self._mapEle[i].dataset) {
                    let _key = key.substr(3);

                    _key = _key.substr(0, 1).toUpperCase() + _key.substr(1);

                    switch (key) {
                        case 'mapClickableIcons':   // true/false value
                        case 'mapDisableDefaultUI':
                        case 'mapDisableDoubleClickZoom':
                        case 'mapDraggable':
                        case 'mapFullscreenControl':
                        case 'mapKeyboardShortcuts':
                        case 'mapMapTypeControl':
                        case 'mapNoClear':
                        case 'mapPanControl':
                        case 'mapRotateControl':
                        case 'mapScaleControl':
                        case 'mapScrollwheel':
                        case 'mapStreetViewControl':
                        case 'mapZoomControl':
                            _options[_key] = self._mapEle[i].dataset[key] === 'true';
                            break;
                        case 'mapHeading':    // number value
                        case 'mapMaxZoom':
                        case 'mapTilt':
                        case 'mapZoom':
                            _options[_key] = Number(self._mapEle[i].dataset[key]);
                            break;
                        case 'mapCenter':   // latlng
                            let _latlng = self._mapEle[key].dataset.mapCenter.replace(/ /g, '').split(',');
                            if (_latlng.length >= 2) _options[_key] = {lat: _latlng[0], lng: _latlng[1]};
                            break;
                        case 'mapFullscreenControlOptions':     // control options
                        case 'mapPanControlOptions':
                        case 'mapRotateControlOptions':
                        case 'mapScaleControlOptions':
                        case 'mapStreetViewControlOptions':
                        case 'mapZoomControlOptions':
                            _options[_key] = {position: self._mapEle[i].dataset[key]}
                            break;
                        case 'mapGeolocation':    // skip value
                            break;
                        default:
                            _options[_key] = self._mapEle[i].dataset[key];
                            break;
                    }
                }
            }

            self._map.push(new google.maps.Map(self._mapEle[i], _options));

            self._map[i].mapIndex = i;

            if (self._mapEle[i].dataset.mapGeolocation === 'true' || self._options.geolocation) self._geolocation(i);

            if (self._options.events)
                self.addEvents(self._options.events, i);

            if (self._options.markers)
                self.addMarkers(self._options.markers, i);
        }

        self._ready = true;
    }

    _geolocation (index) {
        let _options = this._options.geolocationOption ? this._options.geolocationOption : {},
            _index = parseInt(index) === 0 ? 0 : parseInt(index) || -1;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                if (_options.marker) {
                    _options.marker.position = pos;
                    this.addMarkers([_options.marker]);
                }

                this._map[_index].setCenter(pos);
            }, () => {
                handleLocationError(true, this._map[index].getCenter());
            }, _options);
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, this._map[index].getCenter());
        }

        function handleLocationError (browserHasGeolocation, pos) {
            console.log(pos);
            // console.log(browserHasGeolocation ?
            //     'Error: The Geolocation service failed.' :
            //     'Error: Your browser doesn\'t support geolocation.');
        }
    }

    setZoom (zoom, index = -1) {
        function _setZoom (map) {
            map.setZoom(zoom);
            _results.push(map.mapIndex);
        }

        let _index = parseInt(index) === 0 ? 0 : parseInt(index) || -1,
            _results = [];

        if (_index === -1) {
            for (let i = 0; i < this._map.length; i++)
                _setZoom(this._map[i]);
        } else if (this._map[_index])
            _setZoom(this._map[_index]);

        return _results.length <= 0 ? false : _results;
    }

    setCenter (center, panTo = true, index = -1) {
        function _setCenter (map) {
            if (panTo) map.panTo(center);
            else map.setCenter(center);
            _results.push(map.mapIndex);
        }

        let _index = parseInt(index) === 0 ? 0 : parseInt(index) || -1,
            _results = [];

        if (_index === -1) {
            for (let i = 0; i < this._map.length; i++)
                _setCenter(this._map[i]);
        } else if (this._map[_index])
            _setCenter(this._map[_index]);

        return _results.length <= 0 ? false : _results;
    }

    addEvents (options, index = -1) {
        let _results = [];

        for (let key in options)
            _results = _results.concat(this._addEvent(key, options[key], index));

        return _results;
    }
    
    _addEvent (event, options, index = -1) {
        function _addEvent (ele) {
            if (_disableOther) google.maps.event.clearListeners(ele, event);
            ele.addListener(event, function (e) {
                _callback(e, this);
            });
            _results.push({
                type: options.type ? options.type : 'map',
                event: event,
                markerId: ele.markerId ? ele.markerId : null,
                mapIndex: ele.mapIndex ? ele.mapIndex : ele.mapId
            });
        }

        let _callback = typeof options === 'function' ? options : options.callback,
            _disableOther = options.disableOther === true,
            _index = parseInt(index) === 0 ? 0 : parseInt(index) || -1,
            _results = [];

        switch (options.type) {
            case 'marker':     // add to marker
                let _marker = this._findMarker(options.marker, _index);

                for (let i = 0; i < _marker.length; i++)
                    _addEvent(_marker[i]);
                break;
            default:    // add to map
                if (_index === -1) {
                    for (let i = 0; i < this._map.length; i++)
                        _addEvent(this._map[i]);
                } else if (this._map[_index])
                    _addEvent(this._map[_index]);
                break;
        }

        return _results;
    }

    addMarkers (markers, index = -1) {
        function _addMarkers (self, map) {
            for (let j = 0; j < _markers.length; j++) {
                let _marker = Object.assign({}, _markers[j]),
                    _layer = parseInt(_marker.layer) || 0;
                if (_layer < 0) _layer = 0;

                _marker.map = map;

                delete _marker.layer;

                self._addMarker(_marker, _layer, map.mapIndex);
            }

            _results.push({mapIndex: map.mapIndex, addMarkers: _markers.length});
        }

        let _markers = Array.isArray(markers) ? markers : [markers],
            _index = parseInt(index) === 0 ? 0 : parseInt(index) || -1,
            _results = [];

        if (_index === -1) {
            for (let i = 0; i < this._map.length; i++)
                _addMarkers(this, this._map[i]);
        } else if (this._map[_index])
            _addMarkers(this, this._map[_index]);

        return _results;
    }

    _addMarker (marker, layer = 0, index = 0) {
        if (marker.position) {
            let _options = marker,
                _marker,
                _index = parseInt(index) || 0,
                _events = marker.events,
                _event;

            delete _options.events;

            if (typeof _options.position.lat === 'function') _options.position.lat = _options.position.lat();
            if (typeof _options.position.lng === 'function') _options.position.lng = _options.position.lng();

            if (typeof _options.position.lat === 'number' && typeof _options.position.lat === 'number') {
                _marker = new google.maps.Marker(_options);

                if (this._layer.length < layer + 1) {
                    for (let i = this._layer.length; i < layer + 1; i++)
                        this._layer.push([]);
                }

                _marker.markerId = layer + '-' + _marker.position.lat() + '-' + _marker.position.lng();
                _marker.mapId = _index;

                if (_events) {
                    for (let key in _events) {
                        _event = _events[key];

                        _event.type = 'marker';
                        _event.marker = _marker;

                        this._addEvent(key, _event, _index);
                    }
                }

                this._layer[layer].push(_marker);
            }
        }
    }

    toggleLayer (options, layer = -1, index = -1) {
        let _markers,
            _options = Object.assign({
                show: true,
                remove: false
            }, options),
            _layer = parseInt(layer) === 0 ? 0 : parseInt(layer) || -1,
            _index = parseInt(index) === 0 ? 0 : parseInt(index) || -1;

        if (_layer === -1) {
            _markers = Array.isArray(this.layer[0]) ? this.layer[0] : [];

            for (let i = 1; i < this._layer.length; i++)
                _markers = _markers.concat(this._layer[i]);
        } else
            _markers = Array.isArray(this.layer[_layer]) ? this.layer[_layer] : [];

        if (_index !== -1)
            _markers = _markers.filter((e) => e.mapId === _index);

        return this.toggleMarker(_options, _markers);
    }

    toggleMarker (options, marker, index = -1) {
        let _marker,
            _options = Object.assign({
                show: true,
                remove: false
            }, options),
            _arr,
            _results = {
                action: _options.remove ? 'remove' : _options.show ? 'show' : 'hide',
                markers: []
            };

        _marker = this._findMarker(marker, index);

        if (_options.show && !_options.remove) {
            for (let i = 0; i < _marker.length; i++) {
                if (_marker[i].mapId === -1) {
                    for (let j = 0; j < this._map.length; j++)
                        _marker[i].setMap(this._map[j]);
                } else _marker[i].setMap(this._map[_marker[i].mapId]);

                _results.markers.push({markerId: _marker[i].markerId, mapId: _marker[i].mapId});
            }
        } else {
            for (let i = 0; i < _marker.length; i++) {
                _marker[i].setMap(null);

                if (_options.remove) {
                    _arr = _marker[i].markerId.split('-');
                    _arr[0] = parseInt(_arr[0]);
                    if (typeof _arr[0] !== 'string') this._layer[_arr[0]] = this._layer[parseInt(_arr[0])].filter((e) => !(e.markerId === _marker[i].markerId && e.mapId === _marker[i].mapId));
                }

                _results.markers.push({markerId: _marker[i].markerId, mapId: _marker[i].mapId});
            }
        }

        return _results;
    }

    _findMarker (marker, index = -1) {
        let _marker,
            _arr,
            _index = parseInt(index) === 0 ? 0 : parseInt(index) || -1;

        if (typeof marker === 'string') {
            _arr = marker.split('-');

            if (_arr.length >= 3) {
                _arr[0] = parseInt(_arr[0]);
                if (typeof _arr[0] !== 'string') _marker = this._layer[_arr[0]].filter((e) => e.markerId === marker);
            } else _marker = [];
        } else
            _marker = Array.isArray(marker) ? marker : [marker];

        if (_index !== -1 && _marker.length > 0)
            _marker = _marker.filter((e) => e.mapId === _index);

        return _marker;
    }

    nearMarkers (center, radius = 1, layer = -1, index = -1) {
        function _rad (x) {
            return x * Math.PI / 180;
        }

        let _layer = parseInt(layer) === 0 ? 0 : parseInt(layer) || -1,
            _index = parseInt(index) === 0 ? 0 : parseInt(index) || -1,
            _km = 6371,
            _markers = [],
            _nearMarkers = [];

        if (_layer === -1) {
            for (let i = 0; i < this._layer.length; i++) {
                if (Array.isArray(this._layer[i]))
                    _markers = _markers.concat(this._layer[i]);
            }
        } else if (Array.isArray(this._layer[_layer]))
            _markers = this._layer[_layer];

        for (let i = 0; i < _markers.length; i++) {
            let _pos = {lat: _markers[i].position.lat(), lng: _markers[i].position.lng()},
                _dPos = {lat: _rad(_pos.lat - center.lat), lng: _rad(_pos.lng - center.lng)},
                _a = Math.sin(_dPos.lat / 2) * Math.sin(_dPos.lat / 2) +
                    Math.cos(_rad(center.lat)) * Math.cos(_rad(center.lat)) * Math.sin(_dPos.lng / 2) * Math.sin(_dPos.lng / 2),
                _c = 2 * Math.atan2(Math.sqrt(_a), Math.sqrt(1 - _a)),
                _d = _km * _c;

            if (_d <= radius) {
                if (_index === -1 || _markers[i].mapId === _index)
                    _nearMarkers.push(_markers[i]);
            }
        }

        return _nearMarkers;
    }

    get map () { return this._map; }

    get layer () { return this._layer; }

    get zoom () {
        let _zoom = [];

        for (let i = 0; i < this._map.length; i++)
            _zoom.push(this._map[i].getZoom());

        return _zoom;
    }

    get center () {
        let _center = [];

        for (let i = 0; i < this._map.length; i++)
            _center.push({lat: this._map[i].getCenter().lat(), lng: this._map[i].getCenter().lng()});

        return _center;
    }
}
