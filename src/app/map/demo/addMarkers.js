import Map from 'map';

let map = new Map('.mapDemoAddMarkers', {
    markers: [  // add markers init
        {
            position: {
                lat: 22.28552,
                lng: 114.15769
            }
        }
    ],
    disableDoubleClickZoom: true,   // disable double click zoom
    events: {
        dblclick: (e, self) => {    // add marker to Map when double click
            console.log(e, self);
            
            console.log(map.addMarkers({position: e.latLng}, self.mapIndex));

            console.log('New Map Markers: ', map.layer);
        }
    }
});

map.waitReady(() => {
    // run stript when map ready
    let mapDemoAddMarkersLat = document.getElementById('mapDemoAddMarkersLat');
    let mapDemoAddMarkersLng = document.getElementById('mapDemoAddMarkersLng');
    let mapDemoAddMarkersIndex = document.getElementById('mapDemoAddMarkersIndex');
    let mapDemoAddMarkersButton = document.getElementById('mapDemoAddMarkersButton');
    
    console.log('Map Markers: ', map.layer);

    mapDemoAddMarkersButton.addEventListener('click', (e) => {
        let _marker = {
            position: {
                lat: Number(mapDemoAddMarkersLat.value),
                lng: Number(mapDemoAddMarkersLng.value)
            }
        };
        let _index = Number(mapDemoAddMarkersIndex.value);

        console.log(map.addMarkers(_marker, _index)); // add marker non init

        console.log('New Map Markers: ', map.layer);
    });
});
