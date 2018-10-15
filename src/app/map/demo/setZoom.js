import Map from 'map';

let map = new Map('.mapDemoSetZoom', {
    zoom: 14   // set zoom @ Map init
});

map.waitReady(() => {
    // run stript when map ready
    let mapZoom = map.zoom; // get map zoom in array
    let mapDemoSetZoomZoom = document.getElementById('mapDemoSetZoomZoom');
    let mapDemoSetZoomIndex = document.getElementById('mapDemoSetZoomIndex');
    let mapDemoSetZoomButton = document.getElementById('mapDemoSetZoomButton');
    
    console.log('Map zoom: ', mapZoom);

    mapDemoSetZoomZoom.value = mapZoom[0];

    mapDemoSetZoomButton.addEventListener('click', (e) => {
        let _zoom = Number(mapDemoSetZoomZoom.value);
        let _index = Number(mapDemoSetZoomIndex.value);
        
        console.log(map.setZoom(_zoom, _index)); // set map zoom non init

        console.log('New Map zoom: ', map.zoom);
    });
});
