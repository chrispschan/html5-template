import Map from 'map';

let map = new Map('#mapDemoDefault');

map.waitReady(() => {
    // run stript when map ready
    console.log(`Maps: `, map.map);    // get Map array
});
