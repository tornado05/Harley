'use strict';

var app = app || {};

app.appView = Backbone.View.extend({
    el: '#app',

    currentData: new app.currentWeatherCollection(),

    currentWeatherChart: null,

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
        
        var currentCityWeather = this.currentData.getAverageData(this.cities);
        //TODO get cords from config file
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
        var city = _.first(this.cities).name;
        var param = _.first(this.params).name;
        var label = this._createLabel(city, param);
        
        var chartParams = this.currentData.getWeatherByParams(city, param);
        this.currentWeatherChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartParams.labels,
                datasets: [
                    {
                        label: label,
                        data: chartParams.data,
                        backgroundColor: [
                            "rgba(103, 58, 183, 0.3)",
                            "rgba(63, 81, 181, 0.3)",
                            "rgba(33, 150, 243, 0.3)"
                        ],
                        borderColor: [
                            "rgba(103, 58, 183, 1)",
                            "rgba(63, 81, 181, 1)",
                            "rgba(33, 150, 243, 1)"
                        ],
                        borderWidth: 2
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
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        barPercentage: 0.5
                    }]
                }
            }
        });
    },

    _createLabel: function (city, param){
        _.each(this.params, function (item){
            if (item.name == param) {
                param = item;
            }
        });

        return param.label + ' in ' + city + ' (' + param.units + ')';
    },

    changeDatasets: function (){
        var city = this.$el.find('select[name="city"]').val() || _.first(this.cities).name;
        var param = this.$el.find('select[name="param"]').val() || _.first(this.params).name;
        var label = this._createLabel(city, param);
        var chartParams = this.currentData.getWeatherByParams(city, param);
        console.log(this.currentWeatherChart);
        this.currentWeatherChart.data.datasets[0].label = label;
        this.currentWeatherChart.data.datasets[0].data = chartParams.data;
        this.currentWeatherChart.update();
    }
});