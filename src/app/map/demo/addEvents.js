import Map from 'map';

let map = new Map('.mapDemoAddEvents', {
    markers: [
        {
            position: {
                lat: 22.28552,
                lng: 114.15769
            },
            events: {   // add events to marker
                mouseover: (e, self) => {
                    console.log('mouseover marker');
                }
            }
        },
        {
            position: {
                lat: 22.26479252616582,
                lng: 113.9421272277832
            }
        }
    ],
    events: {  // add events init
        drag: (e, self) => {
            console.log('drag map');
        }
    }
});

map.waitReady(() => {
    // add events non-init
    console.log(map.addEvents({ // add events to all maps
        zoom_changed: (e, self) => {  // add event with default setting
            console.log('map zoom change');
        },
        click: {    // add event with custom setting
            callback: (e, self) => {
                console.log('click marker');
            },
            type: 'marker',
            marker: map.layer[0]    // add event to all markers in map.layer[0]
        }
    }));

    console.log(map.addEvents({ // add events to map.map[0]
        dblclick: (e, self) => {
            console.log('dblclick map');
        }
    }, 0));
});
