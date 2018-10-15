import Map from 'map';

let map = new Map('.mapDemoToggleMarker', {
    markers: [
        {
            position: {
                lat: 22.28552,
                lng: 114.15769
            },
            label: 'M0'
        },
        {
            position: {
                lat: 22.26479252616582,
                lng: 113.9421272277832
            },
            label: 'M1'
        },
        {
            position: {
                lat: 22.35245727253212,
                lng: 114.11859512329102
            },
            label: 'M2'
        }
    ]
});

map.waitReady(() => {
    // run stript when map ready
    let mapDemoToggleMarkerIndex = document.getElementById('mapDemoToggleMarkerIndex');

    for (let i = 0; i < 3; i++) {
        let markerId = map.layer[0][i].markerId;
        let markerPosition = map.layer[0][i].position;

        document.getElementById(`mapDemoShowButton${i}`).addEventListener('click', (e) => {  // show marker
            let _index = Number(mapDemoToggleMarkerIndex.value);

            console.log(map.toggleMarker({show: true}, markerId, _index));
            console.log(map.layer);
        });

        document.getElementById(`mapDemoHideButton${i}`).addEventListener('click', (e) => {  // hide marker
            let _index = Number(mapDemoToggleMarkerIndex.value);
            
            console.log(map.toggleMarker({show: false}, markerId, _index));
            console.log(map.layer);
        });

        document.getElementById(`mapDemoRemoveButton${i}`).addEventListener('click', (e) => {  // remove marker
            let _index = Number(mapDemoToggleMarkerIndex.value);
            
            console.log(map.toggleMarker({remove: true}, markerId, _index));
            console.log(map.layer);
        });

        document.getElementById(`mapDemoResetButton${i}`).addEventListener('click', (e) => {  // reset marker
            let _index = Number(mapDemoToggleMarkerIndex.value);
            
            map.toggleMarker({remove: true}, markerId, _index);
            map.addMarkers({
                position: markerPosition,
                label: `M${i}`
            }, _index);
            console.log(map.layer);
        });
    }
});
