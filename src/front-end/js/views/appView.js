'use strict';

var app = app || {};

app.appView = Backbone.View.extend({
    el: '#app',

    currentData: new app.currentWeatherCollection(),

    cities: [
        {
            name: "Rivne",
            cords: [50.630694, 26.239034]
        },
        {
            name: "Kiev",
            cords: [50.4308286, 30.4966362]
        },
        {
            name: "Lutsk",
            cords: [50.73977, 25.2639655]
        }
    ],

    initialize: function () {
        this.currentData.fetch();
        this.listenTo(this.currentData, 'update', this.render)
    },

    render: function () {
        this.showMap();
        this.showCurrentWeatherChart();
    },

    showMap: function () {
        var ourMap = L.map('map').setView([50.9, 27.8], 7);
        //TODO: move this data to configs
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: templates.render('map_attribution', {}),
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiZHJvYmVueXVrIiwiYSI6ImNpdXp3aDczZTAwM2wyb3IzbXF0OTZ5YjgifQ.2WbUs9CJ8XuPlG3coCxBbg'
        }).addTo(ourMap);
        //TODO: move path to config file
        L.Icon.Default.imagePath = '../img/images';
        //TODO: take this from configs
        var currentCityWeather = this.currentData.getCurrentAverageData(this.cities);
        //TODO get coords from config file
        _.each(currentCityWeather, function (city) {
            L.marker(city.cords).addTo(ourMap).bindPopup(templates.render('popup_current_city_weather', {
                city: city.name,
                temp: city.temp,
                pressure: city.pressure,
                humidity: city.humidity,
                fallOut: city.fallOut
            }));
        });
    },

    showCurrentWeatherChart: function () {
        var ctx = this.$el.find("#chart-current-weather");
        var label = [];
        var currentWeather = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: ['service1', 'service2', 'service3'],
                datasets: [
                    {
                        label: 'Temperature',
                        data: [11, 9, 10],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)"
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)"
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
});