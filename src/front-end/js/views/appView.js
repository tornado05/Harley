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
                name: "Luts'k",
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
        chart: {
            options: {
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
        },
        map:{
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
        var ourMap = L.map('map').setView(this.appConfig.map.startPoint, this.appConfig.map.startZoom);
        L.tileLayer(this.appConfig.map.url, {
            attribution: templates.render('map_attribution', {}),
            maxZoom: this.appConfig.map.maxZoom,
            id: this.appConfig.map.tilesId,
            accessToken: this.appConfig.map.token
        }).addTo(ourMap);
        L.Icon.Default.imagePath = this.appConfig.chart.images;
        var currentCityWeather = weatherDataService.getAverageParams(this.currentData, this.appConfig.cities);
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
        var city        = _.first(this.appConfig.cities).name,
            param       = _.first(this.appConfig.params).name,
            label       = this._createLabel(city, param),
            chartParams = this.currentData.getWeatherByParams(city, param);
        this.currentWeatherChart = new Chart(this.$el.find("#chart-current-weather"), {
            type: 'bar',
            data: {
                labels: chartParams.labels,
                datasets: [
                    {
                        label: label,
                        data: chartParams.data,
                        backgroundColor: this.appConfig.chart.colors.background,
                        borderColor: this.appConfig.chart.colors.border,
                        borderWidth: 2
                    }
                ]
            },
            options: this.appConfig.chart.options
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
        var city        = this.$el.find('select[name="city"]').val() || _.first(this.appConfig.cities).name,
            param       = this.$el.find('select[name="param"]').val() || _.first(this.appConfig.params).name,
            label       = this._createLabel(city, param),
            chartParams = this.currentData.getWeatherByParams(city, param);
        _.first(this.currentWeatherChart.data.datasets).label = label;
        _.first(this.currentWeatherChart.data.datasets).data = chartParams.data;
        this.currentWeatherChart.update();
    }
});