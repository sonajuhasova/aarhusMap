mapboxgl.accessToken = 'pk.eyJ1Ijoic29uYWp1aGFzb3ZhIiwiYSI6ImNrN2QxNmt1YjA1aWIza3FrY3F6cmEyZnAifQ.yQnjU9hjmTyVa7hbbo2z-A';
var map = new mapboxgl.Map({
    style: 'mapbox://styles/sonajuhasova/ck7d24w5p0ckv1ipou5dgwqu6',
    center: [10.204, 56.140],
    zoom: 12,
    pitch: 45,
    bearing: -17.6,
    container: 'map',
    antialias: true
});

function rotateCamera(timestamp) {
    // clamp the rotation between 0 -360 degrees
    // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
    map.rotateTo((timestamp / 100) % 360, {
        duration: 0
    });
    // Request the next frame of the animation.
    requestAnimationFrame(rotateCamera);
}

map.on('load', function () {
    // Start the animation.
    rotateCamera(0);





    // The 'building' layer in the mapbox-streets vector source contains building-height
    // data from OpenStreetMap.
    map.on('load', function () {
        // Insert the layer beneath any symbol layer.
        var layers = map.getStyle().layers;

        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }

        map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',

                    // use an 'interpolate' expression to add a smooth transition effect to the
                    // buildings as the user zooms in
                    'fill-extrusion-height': [
'interpolate',
['linear'],
['zoom'],
15,
0,
15.05,
['get', 'height']
],
                    'fill-extrusion-base': [
'interpolate',
['linear'],
['zoom'],
15,
0,
15.05,
['get', 'min_height']
],
                    'fill-extrusion-opacity': 0.6
                }
            },
            labelLayerId
        );



    }); //3d buildings end
}); //rotation end
