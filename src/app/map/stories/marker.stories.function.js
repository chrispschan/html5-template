import Map from 'map';

const markerEvents = {
  click: (event, marker) => {
    map.toggleMarker({remove: true}, marker.markerId);
  }
};

const map = new Map('.map', {
  key: 'AIzaSyBDWiNjmhLiH5KHrqKQL-mNN9gZ0GpzZvM',
  markers: [
    {
      position: {
        lat: 22.28552,
        lng: 114.15769
      },
      layer: 0,
      events: markerEvents
    },
    {
      position: {
        lat: 22.4607683047188,
        lng: 114.23047442382813
      },
      layer: 1,
      events: markerEvents
    }
  ],
  events: {
    rightclick: (event) => {
      map.addMarkers({
        position: event.latLng,
        layer: parseInt(mapLayer.value),
        events: markerEvents
      });
    }
  }
});

const mapLayer = document.getElementById('mapLayer');
const mapMarkers = document.getElementById('mapMarkers');
const mapLayerShow = document.getElementById('mapLayerShow');
const mapLayerRemove = document.getElementById('mapLayerRemove');
const mapCenterLat = document.getElementById('mapCenterLat');
const mapCenterLng = document.getElementById('mapCenterLng');
const mapRadius = document.getElementById('mapRadius');
const mapFindLayer = document.getElementById('mapFindLayer');

window.toggleLayer = () => {
  map.toggleLayer({
    show: mapLayerShow.checked,
    remove: mapLayerRemove.checked
  }, parseInt(mapLayer.value));
};

window.getCenter = () => {
  let center = map.center;

  mapCenterLat.value = center[0].lat;
  mapCenterLng.value = center[0].lng;
};

window.nearMarkers = () => {
  let markers = map.nearMarkers({
    lat: parseFloat(mapCenterLat.value),
    lng: parseFloat(mapCenterLng.value)
  }, parseFloat(mapRadius.value), parseFloat(mapFindLayer.value));
  let markerId;

  mapMarkers.innerHTML = '';

  for (let i = 0; i < markers.length; i++) {
    markerId = markers[i].markerId.split('-');
    mapMarkers.innerHTML += `<tr>
      <td>${markers[i].markerId}</td>
      <td>${markerId[0]}</td>
      <td>${markers[i].position.lat()}</td>
      <td>${markers[i].position.lng()}</td>
    </tr>`;
  }
};

window.getMarkers = () => {
  let layers = map.layer;

  mapMarkers.innerHTML = '';

  for (let i = 0; i < layers.length; i++) {
    mapMarkers.innerHTML += `<tr><td colspan="4">Layer ${i}</td></tr>`;

    for (let j = 0; j < layers[i].length; j++) {
      mapMarkers.innerHTML += `<tr>
        <td>${layers[i][j].markerId}</td>
        <td>${i}</td>
        <td>${layers[i][j].position.lat()}</td>
        <td>${layers[i][j].position.lng()}</td>
      </tr>`;
    }
  }
};
