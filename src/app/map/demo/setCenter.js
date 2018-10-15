import Map from 'map';

let map = new Map('.mapDemoSetCenter', {
    center: {   // set center @ Map init
        lat: 22.26479252616582,
        lng: 113.9421272277832
    }
});

map.waitReady(() => {
    // run stript when map ready
    let mapCenter = map.center; // get map center in array
    let mapDemoSetCenterLat = document.getElementById('mapDemoSetCenterLat');
    let mapDemoSetCenterLng = document.getElementById('mapDemoSetCenterLng');
    let mapDemoSetCenterPanTo = document.getElementById('mapDemoSetCenterPanTo');
    let mapDemoSetCenterIndex = document.getElementById('mapDemoSetCenterIndex');
    let mapDemoSetCenterButton = document.getElementById('mapDemoSetCenterButton');
    
    console.log('Map center: ', mapCenter);

    mapDemoSetCenterLat.value = mapCenter[0].lat;
    mapDemoSetCenterLng.value = mapCenter[0].lng;

    mapDemoSetCenterButton.addEventListener('click', (e) => {
        let _center = {
            lat: Number(mapDemoSetCenterLat.value),
            lng: Number(mapDemoSetCenterLng.value)
        };
        let _panTo = mapDemoSetCenterPanTo.checked;
        let _index = Number(mapDemoSetCenterIndex.value);

        console.log(map.setCenter(_center, _panTo, _index)); // set map center non init

        console.log('New Map center: ', map.center);
    });
});
