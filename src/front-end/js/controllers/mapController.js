Harley.controller("mapController", ["$scope", function ($scope) {
    //TODO: take this values from user config, by default from constants
    angular.extend($scope, {
        center: {
            lat: 50.9,
            lng: 27.8,
            zoom: 7
        },
        defaults: {
            //TODO: need to find out why this tiles do not work
            /*tileLayer: "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
            maxZoom: 18,
            tilesId: 'mapbox.streets',
            token: 'pk.eyJ1IjoiZHJvYmVueXVrIiwiYSI6ImNpdXp3aDczZTAwM2wyb3IzbXF0OTZ5YjgifQ.2WbUs9CJ8XuPlG3coCxBbg',*/
            zoomControlPosition: 'topleft',
            tileLayerOptions: {
                opacity: 0.9,
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
        },
        markers:[
            {
                lat: 50.630694,
                lng: 26.239034,
                focus: false,
                draggable: false,
                message: "Rivne",
                icon: {}
            },
            {
                lat: 50.4308286,
                lng: 30.4966362,
                focus: false,
                draggable: false,
                message: "Kiev",
                icon: {}
            },
            {
                lat: 50.73977,
                lng: 25.2639655,
                focus: false,
                draggable: false,
                message: "Luts'k",
                icon: {}
            }
        ]

    })

}]);