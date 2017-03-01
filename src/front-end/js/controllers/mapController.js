Harley.controller("mapController", [
    "$rootScope", "$scope", '$http', 'WeatherService', 'MAPBOX', 'OPENSTREET', 'MAP',
    function ($rootScope, $scope, $http, WeatherService, MAPBOX, OPENSTREET, MAP) {

        var initialize = function () {
            angular.extend($scope, {
                center: {
                    lat: MAP.POSITION.LATITUDE,
                    lng: MAP.POSITION.LONGITUDE,
                    zoom: MAP.BASE_ZOOM
                },
                defaults: getMapOptions(),
                layers: {
                    baselayers: {
                        mapbox: getMapboxConfig(),
                        osm: getOpenStreetConfig()
                    }
                }
            });
            getCurrentWeatherData();
        };

        var getMapOptions = function (){
            return {
                zoomControlPosition: 'topleft',
                tileLayerOptions: {
                    detectRetina: true,
                    reuseTiles: true
                },
                scrollWheelZoom: false
            };
        };

        var getCurrentWeatherData = function(){
            $http.get('/weather/v01/current')
                .then(function (res) {
                    var service = $rootScope.preferedService || "darkSky";
                    var data = WeatherService.getDataByService(res.data, service);
                    //TODO: move to module which will be responsible for data grab
                    $rootScope.currentWeather = res.data;
                    renderMarkers(data);
                }, function (res) {
                    console.log("Something went wrong:", res.statusText);
                });
        };

        var getMapboxConfig = function(){
            return {
                name: MAPBOX.NAME,
                url: MAPBOX.URL,
                type: MAPBOX.TYPE,
                layerOptions: {
                    apikey: MAPBOX.API_KEY,
                    mapid: MAPBOX.TILES_NAME
                }
            }
        };

        var getOpenStreetConfig = function(){
            return {
                name: OPENSTREET.NAME,
                url: OPENSTREET.URL,
                type: OPENSTREET.TYPE
            };
        };

        var prepareMarkerMsg = function (data) {
            return [
                '<h4>',
                data.cityName,
                '</h4><ul><li>Temperature: <b>',
                data.temp,
                ' &deg;C</b></li>',
                '<li>Pressure: <b>',
                data.pressure,
                ' mmHg</b></li>',
                '<li>Humidity: <b>',
                data.humidity, ' %</b></li>',
                '<li>Wind speed: <b>',
                data.windSpeed,
                ' meter/sec</b></li></ul>'
            ].join('')
        };

        var renderMarkers = function (data) {
            var markers = [];
            _.each(data, function (item) {
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