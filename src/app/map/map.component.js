import Map from 'map/map.class';

const map = new Map('#map1, #map2', {
    key: 'AIzaSyAlpRoexXX5SR56A3dvQmQ2Hcc3ZCXHB30',
    language: 'zh-TW',
    libraries: ['place', 'geometry'],
    events: {
        click: function (event, self) {
            let _layer = document.getElementById('mapLayer').value;
            map.addMarkers([{position: event.latLng, layer: _layer, draggable: true}], self.mapIndex);
            // console.log(event);
            // console.log('click');
            // console.log(map.zoom);
            // console.log(map.center);

            // map.setCenter(event.latLng, true, self.mapIndex);
        }
    },
    markers: {
        position: {lat: 22.28552, lng: 114.15769},
        events: {
            click: function (event, self) {
                // console.log(self);
                map.toggleMarker({remove: true}, self);
            }
        }
    }
});

map.waitReady(function () {
    let markerClick = {
        click: function (event, self) {
            let _layer = self.markerId.split('-');
            map2.setCenter({lat: self.position.lat(), lng: self.position.lng()}, false);
            switch (_layer[0]) {
                case '0':
                    map2.setZoom(map2Options.lv2);
                    break;
                case '1':
                    map2.setZoom(map2Options.lv3);
                    break;
                case '2':
                    map2.setZoom(map2Options.lv4);
                    break;
                default:
                    break;
            }
        }
    };
    const map2Options = {
        zoom: 12,
        minZoom: 12,
        maxZoom: 20,
        lv2: 14,
        lv3: 16,
        lv4: 18
    };
    const map2 = new Map('#map3', {
        scrollwheel: false,
        disableDoubleClickZoom: true,
        zoom: map2Options.zoom,
        maxZoom: map2Options.maxZoom,
        minZoom: map2Options.minZoom,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        events: {
            dblclick: function (event, self) {
                let _zoom = map2.zoom[self.mapIndex];
                map2.setCenter({lat: event.latLng.lat(), lng: event.latLng.lng()}, false);

                if (_zoom < map2Options.lv2)
                    map2.setZoom(map2Options.lv2);
                else if (_zoom < map2Options.lv3)
                    map2.setZoom(map2Options.lv3);
                else if (_zoom < map2Options.lv4)
                    map2.setZoom(map2Options.lv4);
            },
            zoom_changed: function (event, self) {
                let _zoom = map2.zoom[self.mapIndex];
                map2.toggleLayer({show: false});
                if (_zoom < map2Options.lv2)
                    map2.toggleLayer({show: true}, 0);
                else if (_zoom < map2Options.lv3)
                    map2.toggleLayer({show: true}, 1);
                else if (_zoom < map2Options.lv4)
                    map2.toggleLayer({show: true}, 2);
                else
                    map2.toggleLayer({show: true}, 3);
            }
        },
        markers: [
            {
                position: {lat: 22.26479252616582, lng: 113.9421272277832},
                layer: 0,
                title: 'Islands',
                events: markerClick
            },
            {
                position: {lat: 22.35245727253212, lng: 114.11859512329102},
                'title': 'Kwai Tsing',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.51921715492658, lng: 114.16683197021484},
                'title': 'North',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.343407483680966, lng: 114.2519760131836},
                'title': 'Sai Kung',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.395475418673982, lng: 114.20391082763672},
                'title': 'Sha Tin',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.474809756551785, lng: 114.16339874267578},
                'title': 'Tai Po',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.398014819650584, lng: 114.08100128173828},
                'title': 'Tsuen Wan',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.405632744261258, lng: 113.97457122802734},
                'title': 'Tuen Mun',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.47163725423792, lng: 114.0549087524414},
                'title': 'Yuen Long',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.323559398723226, lng: 114.18794631958008},
                'title': 'Kowloon City',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.311808001721275, lng: 114.23257827758789},
                'title': 'Kwun Tong',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.339755648113528, lng: 114.15327072143555},
                'title': 'Sham Shui Po',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.338485422016195, lng: 114.22159194946289},
                'title': 'Wong Tai Sin',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.309902276555697, lng: 114.17078018188477},
                'title': 'Yau Tsim Mong',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.274959374113703, lng: 114.15121078491211},
                'title': 'Central and Western',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.27337085282337, lng: 114.22296524047852},
                'title': 'Eastern',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.248269822953652, lng: 114.20099258422852},
                'title': 'Southern',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.274641671298806, lng: 114.1889762878418},
                'title': 'Wan Chai',
                layer: 0,
                events: markerClick
            },
            {
                position: {lat: 22.348416, lng: 114.126161},
                layer: 1,
                title: 'Lai King',
                events: markerClick
            },
            {
                position: {lat: 22.3080749, lng: 114.2018982},
                layer: 1,
                title: 'Kowloon Bay',
                events: markerClick
            },
            {
                position: {lat: 22.322466, lng: 114.2167592},
                layer: 1,
                title: 'Ngau Tau Kok',
                events: markerClick
            },
            {
                position: {lat: 22.3377402, lng: 114.1862935},
                layer: 1,
                title: 'Lok Fu',
                events: markerClick
            },
            {
                position: {lat: 22.3, lng: 114.2},
                layer: 1,
                title: 'Diamond Hill',
                events: markerClick
            },
            {
                position: {lat: 22.334546, lng: 114.208764},
                layer: 1,
                title: 'Ngau Chi Wan',
                events: markerClick
            },
            {
                position: {lat: 22.3548115, lng: 114.1974398},
                layer: 1,
                title: 'Wong Tai Sin',
                events: markerClick
            },
            {
                position: {lat: 22.3364426, lng: 114.1989259},
                layer: 1,
                title: 'San Po Kong',
                events: markerClick
            },
            {
                position: {lat: 22.3221916, lng: 114.189293},
                layer: 1,
                title: 'Ma Tau Chung',
                events: markerClick
            },
            {
                position: {lat: 22.28552, lng: 114.15769},
                layer: 2,
                title: 'Lai King',
                events: markerClick
            },
            {
                position: {lat: 22.28552, lng: 114.15769},
                layer: 3,
                title: 'Lai King',
                events: markerClick
            }
        ],
        styles: [
            {
                'featureType': 'administrative',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'administrative.land_parcel',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'labels.icon',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'transit',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            }
        ]
    });

    map2.waitReady(function () {
        map2.toggleLayer({show: false});
        map2.toggleLayer({show: true}, 0);
    });
});

document.getElementById('hideLayer').addEventListener('click', () => {
    let layer = document.getElementById('mapLayer').value;
    map.toggleLayer({show: false}, layer, -1);
});

document.getElementById('showLayer').addEventListener('click', () => {
    let layer = document.getElementById('mapLayer').value;
    map.toggleLayer({show: true}, layer, -1);
});

document.getElementById('hideLayers').addEventListener('click', () => {
    // let layer = document.getElementById('mapLayer').value;
    map.toggleLayer({show: false}, -1, -1);
});

document.getElementById('showLayers').addEventListener('click', () => {
    // let layer = document.getElementById('mapLayer').value;
    map.toggleLayer({show: true}, -1, -1);
});

document.getElementById('removeLayer').addEventListener('click', () => {
    let layer = document.getElementById('mapLayer').value;
    map.toggleLayer({remove: true}, layer, -1);
});

document.getElementById('nearMarkers').addEventListener('click', () => {
    map.toggleLayer({show: false}, -1, -1);
    let _markers = map.nearMarkers(map.center[0], document.getElementById('nearDir').value);

    for (let i = 0; i < _markers.length; i++)
        map.toggleMarker({show: true}, _markers[i]);
});

module.exports = map;
