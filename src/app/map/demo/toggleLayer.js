import Map from 'map';

let map = new Map('.mapDemoToggleLayer', {
    markers: [  // add markers with layer option
        {
            position: {
                lat: 22.28552,
                lng: 114.15769
            },
            layer: 0,
            label: 'L0'
        },
        {
            position: {
                lat: 22.26479252616582,
                lng: 113.9421272277832
            },
            layer: 1,
            label: 'L1'
        },
        {
            position: {
                lat: 22.35245727253212,
                lng: 114.11859512329102
            },
            layer: 2,
            label: 'L2'
        }
    ]
});

map.waitReady(() => {
    // run stript when map ready
    let mapDemoToggleLayerShow = document.getElementById('mapDemoToggleLayerShow');
    let mapDemoToggleLayerRemove = document.getElementById('mapDemoToggleLayerRemove');
    let mapDemoToggleLayer = document.getElementById('mapDemoToggleLayer');
    let mapDemoToggleIndex = document.getElementById('mapDemoToggleIndex');
    let mapDemoToggleLayerButton = document.getElementById('mapDemoToggleLayerButton');
    let mapDemoToggleLayerAddMarkersLat = document.getElementById('mapDemoToggleLayerAddMarkersLat');
    let mapDemoToggleLayerAddMarkersLng = document.getElementById('mapDemoToggleLayerAddMarkersLng');
    let mapDemoToggleLayerAddMarkersLayer = document.getElementById('mapDemoToggleLayerAddMarkersLayer');
    let mapDemoToggleLayerAddMarkersIndex = document.getElementById('mapDemoToggleLayerAddMarkersIndex');
    let mapDemoToggleLayerAddMarkerButton = document.getElementById('mapDemoToggleLayerAddMarkerButton');

    console.log('Map Markers: ', map.layer);

    mapDemoToggleLayerButton.addEventListener('click', (e) => {
        let _options = {
            show: mapDemoToggleLayerShow.checked,
            remove: mapDemoToggleLayerRemove.checked
        };
        let _layer = Number(mapDemoToggleLayer.value);
        let _index = Number(mapDemoToggleIndex.value);

        console.log(map.toggleLayer(_options, _layer, _index)); // set layer hide/show

        console.log('New Map Markers: ', map.layer);
    });

    mapDemoToggleLayerAddMarkerButton.addEventListener('click', (e) => {
        let _marker = {
            position: {
                lat: Number(mapDemoToggleLayerAddMarkersLat.value),
                lng: Number(mapDemoToggleLayerAddMarkersLng.value)
            },
            layer: Number(mapDemoToggleLayerAddMarkersLayer.value) >= 0 ? mapDemoToggleLayerAddMarkersLayer.value : 0,
            label: 'L' + (Number(mapDemoToggleLayerAddMarkersLayer.value) >= 0 ? mapDemoToggleLayerAddMarkersLayer.value : 0)
        };

        let _index = Number(mapDemoToggleLayerAddMarkersIndex.value);

        console.log(map.addMarkers(_marker, _index));   // add markers with layer option non-init

        console.log('New Map Markers: ', map.layer);
    });
});
