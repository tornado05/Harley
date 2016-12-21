'use strict';

var app = app || {};

app.appView = Backbone.View.extend({
    el: '#app',

    currentData: new app.currentWeatherCollection(),

    currentWeatherChart: null,

    appConfig: {
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
        params: [
            {
                name: 'temp',
                label: 'Temperature',
                units: 'C'
            },
            {
                name: 'pressure',
                label: 'Pressure',
                units: 'mmHg'
            },
            {
                name: 'humidity',
                label: 'Humidity',
                units: '%'
            },
            {
                name: 'windSpeed',
                label: 'Wind speed',
                units: 'meter/sec'
            },
            {
                name: 'windDir',
                label: 'Wind direction',
                units: 'degrees'
            },
            {
                name: 'clouds',
                label: 'Clouds',
                units: '%'
            }

        ],
        colors: {
            background: [
                "rgba(103, 58, 183, 0.3)",
                "rgba(63, 81, 181, 0.3)",
                "rgba(33, 150, 243, 0.3)"
            ],
            border: [
                "rgba(103, 58, 183, 1)",
                "rgba(63, 81, 181, 1)",
                "rgba(33, 150, 243, 1)"
            ]
        },
        chartOptions: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        images: '../img/images',
        mapOptions:{
            startPoint: [50.9, 27.8],
            startZoom: 7,
            url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
            maxZoom: 18,
            tilesId: 'mapbox.streets',
            token: 'pk.eyJ1IjoiZHJvYmVueXVrIiwiYSI6ImNpdXp3aDczZTAwM2wyb3IzbXF0OTZ5YjgifQ.2WbUs9CJ8XuPlG3coCxBbg'
        }
    },

    events: {
        "change .cur-params": "changeDatasets"
    },

    initialize: function () {
        this.currentData.fetch();
        this.listenTo(this.currentData, 'update', this.render)
    },

    render: function () {
        this.showMap();
        this.showCurrentWeatherChart();
    },

    showMap: function () {
        var ourMap = L.map('map').setView(this.appConfig.mapOptions.startPoint, this.appConfig.mapOptions.startZoom);
        L.tileLayer(this.appConfig.mapOptions.url, {
            attribution: templates.render('map_attribution', {}),
            maxZoom: this.appConfig.mapOptions.maxZoom,
            id: this.appConfig.mapOptions.tilesId,
            accessToken: this.appConfig.mapOptions.token
        }).addTo(ourMap);
        L.Icon.Default.imagePath = this.appConfig.images;
        var currentCityWeather = this.currentData.getAverageData(this.appConfig.cities);
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
        var city = _.first(this.appConfig.cities).name;
        var param = _.first(this.appConfig.params).name;
        var label = this._createLabel(city, param);
        console.log(label);
        var chartParams = this.currentData.getWeatherByParams(city, param);
        this.currentWeatherChart = new Chart(this.$el.find("#chart-current-weather"), {
            type: 'bar',
            data: {
                labels: chartParams.labels,
                datasets: [
                    {
                        label: label,
                        data: chartParams.data,
                        backgroundColor: this.appConfig.colors.background,
                        borderColor: this.appConfig.colors.border,
                        borderWidth: 2
                    }
                ]
            },
            options: this.appConfig.chartOptions
        });
    },

    _createLabel: function (city, param) {
        _.each(this.appConfig.params, function (item) {
            if (item.name == param) {
                param = item;
            }
        });
        return param.label + ' in ' + city + ' (' + param.units + ')';
    },

    changeDatasets: function () {
        var city = this.$el.find('select[name="city"]').val() || _.first(this.appConfig.cities).name;
        var param = this.$el.find('select[name="param"]').val() || _.first(this.appConfig.params).name;
        var label = this._createLabel(city, param);
        var chartParams = this.currentData.getWeatherByParams(city, param);
        this.currentWeatherChart.data.datasets[0].label = label;
        this.currentWeatherChart.data.datasets[0].data = chartParams.data;
        this.currentWeatherChart.update();
    }
});