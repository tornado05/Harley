Harley.controller("mapController", ["$scope", '$http', function ($scope, $http) {

    var initialize = function () {
        //TODO: take this values from user config, by default from constants
        angular.extend($scope, {
            center: {
                lat: 50.9,
                lng: 27.8,
                zoom: 7
            },
            defaults: {
                zoomControlPosition: 'topleft',
                tileLayerOptions: {
                    detectRetina: true,
                    reuseTiles: true
                },
                scrollWheelZoom: false
            },
            layers: {
                baselayers: {
                    mapbox_light: {
                        name: 'mapbox.streets',
                        url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                        type: 'xyz',
                        layerOptions: {
                            apikey: 'pk.eyJ1IjoiZHJvYmVueXVrIiwiYSI6ImNpdXp3aDczZTAwM2wyb3IzbXF0OTZ5YjgifQ.2WbUs9CJ8XuPlG3coCxBbg',
                            mapid: 'mapbox.streets'
                        }
                    },
                    osm: {
                        name: 'OpenStreetMap',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        type: 'xyz'
                    }
                }
            }
        });
        //TODO: this should be redo into some model to manipulate with data
        $http.get('/weather/v01/current')
            .then(function (response) {
                renderMarkers(response);
            }, function (response) {
                //Second function handles error
                console.log("Something went wrong:", response.statusText);
            });
    };

    var prepareMarkerMsg = function (data) {
        return [
            '<h4>',
            data,
            '</h4>',
            '<ul><li>Temperature: <b>8 &deg;C</b></li>',
            '<li>Pressure: <b>1170 mmHg</b></li>',
            '<li>Humidity: <b>70 %</b></li>',
            '<li>Wind speed: <b>12 meter/sec</b></li></ul>'
        ].join('')
    };

    var renderMarkers = function (data) {
        var markers = [];
        console.log('Weather', data);
        angular.extend($scope, {
            markers: [
                {
                    lat: 50.630694,
                    lng: 26.239034,
                    focus: false,
                    draggable: false,
                    message: prepareMarkerMsg("Rivne"),
                    icon: {}
                },
                {
                    lat: 50.4308286,
                    lng: 30.4966362,
                    focus: false,
                    draggable: false,
                    message: prepareMarkerMsg("Kiev"),
                    icon: {}
                },
                {
                    lat: 50.73977,
                    lng: 25.2639655,
                    focus: false,
                    draggable: false,
                    message: prepareMarkerMsg("Luts'k"),
                    icon: {}
                }
            ]
        })
    };
    initialize();
}]);