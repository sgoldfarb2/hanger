// const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 
let userLocation = [];

function getLocation () {
    if(window.navigator.geolocation) {
        window.navigator.geolocation
    .getCurrentPosition(showPosition);
    } else {
        console.log('give us your location NOW!')
    }
}

function showPosition(position) {
userLocation = [position.coords.longitude, position.coords.latitude]
return userLocation
}

getLocation()


mapboxgl.accessToken = 'pk.eyJ1Ijoic2dvbGRmYXJiMzM5MCIsImEiOiJjanlnODBvdjQwMGVoM2Jtc21nbGs3eWoxIn0.lLT4kAF2fiiv2Ey-h-5T-A';
let map = new mapboxgl.Map({
  container: 'map', // Container ID
  style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
  center: [-73.935242, 40.730610], // Starting position [lng, lat]
  zoom: 12, // Starting zoom level
});
let marker = new mapboxgl.Marker() // initialize a new marker
// .setLngLat([-122.25948, 37.87221]) // Marker [lng, lat] coordinates
.setLngLat([-73.935242, 40.730610])
.addTo(map); // Add the marker to the map

let geocoder = new MapboxGeocoder({ // Initialize the geocoder
accessToken: mapboxgl.accessToken, // Set the access token
placeholder: 'Search for donation centers in NYC',
mapboxgl: mapboxgl, // Set the mapbox-gl instance
marker: false, // Do not use the default marker style
// bbox: [-122.30937, 37.84214, -122.23715, 37.89838], // Boundary for Berkeley
// proximity: {
// longitude: -122.25948,
// latitude: 37.87221
// } // Coordinates of UC Berkeley
});

// Add the geocoder to the map
map.addControl(geocoder);
// After the map style has loaded on the page,
// add a source layer and default styling for a single point
map.on('load', function() {
map.addSource('single-point', {
type: 'geojson',
data: {
type: 'FeatureCollection',
features: []
}
});

map.addLayer({
id: 'point',
source: 'single-point',
type: 'circle',
paint: {
'circle-radius': 10,
'circle-color': '#448ee4'
}
});

// Listen for the `result` event from the Geocoder
// `result` event is triggered when a user makes a selection
//  Add a marker at the result's coordinates
geocoder.on('result', function(e) {
map.getSource('single-point').setData(e.result.geometry);
});
});
