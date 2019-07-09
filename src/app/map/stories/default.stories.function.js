import Map from 'map';

const map = new Map('.map', {key: 'AIzaSyBDWiNjmhLiH5KHrqKQL-mNN9gZ0GpzZvM'});

const mapZoom = document.getElementById('mapZoom');
const mapCenterLat = document.getElementById('mapCenterLat');
const mapCenterLng = document.getElementById('mapCenterLng');
const mapPanTo = document.getElementById('mapPanTo');

window.setZoom = () => {
  map.setZoom(parseInt(mapZoom.value));
};

window.getZoom = () => {
  mapZoom.value = map.zoom[0];
};

window.setCenter = () => {
  map.setCenter({
    lat: parseFloat(mapCenterLat.value),
    lng: parseFloat(mapCenterLng.value)
  }, mapPanTo.checked);
};

window.getCenter = () => {
  let center = map.center;

  mapCenterLat.value = center[0].lat;
  mapCenterLng.value = center[0].lng;
};
