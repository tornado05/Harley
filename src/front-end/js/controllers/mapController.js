Harley.controller("mapController", [
    "$rootScope", "$scope", '$http', 'WeatherService',
    function ($rootScope, $scope, $http, WeatherService) {

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
        $http.get('/weather/v01/current')
            .then(function (response) {
                var service = $rootScope.preferedService || "darkSky";
                var data = WeatherService.getDataByService(response.data, service);
                //TODO: move to module which will be responsible for data grab
                $rootScope.currentWeather = response.data;
                renderMarkers(data);
            }, function (response) {
                //Handles error
                console.log("Something went wrong:", response.statusText);
            });
    };

    var prepareMarkerMsg = function (data) {
        return [
            '<h4>',
            data.cityName,
            '</h4><ul><li>Temperature: <b>',
            data. temp,
            ' &deg;C</b></li>',
            '<li>Pressure: <b>',
            data.pressure,
            ' mmHg</b></li>',
            '<li>Humidity: <b>',
            data.humidity,' %</b></li>',
            '<li>Wind speed: <b>',
            data.windSpeed,
            ' meter/sec</b></li></ul>'
        ].join('')
    };

    var renderMarkers = function (data) {
        var markers = [];
        _.each(data, function (item){
            markers.push({
                lat: item.coords.lat,
                lng: item.coords.lon,
                focus: false,
                draggable: false,
                message: prepareMarkerMsg(item),
                icon: {}
            });
        });
        angular.extend($scope, {
            markers: markers
        })
    };
    initialize();
}]);