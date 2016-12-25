'use strict';
var logger = require('./../services/logger.js'),
    fs = require('fs');

module.exports = (function () {

    var readData = function (path) {
        try {
            var result = fs.readFileSync(path, 'utf8');
            return JSON.parse(result);
        } catch (e) {
            logger.logError("Can't read from file " + path);
            return [];
        }
    },

        configPath = './config/config.json',
        config = readData(configPath),

        getCitiesURLs = function () {
            var configsAPI_URLs = [];

            config.cities.forEach(function (city) {
                var cityName = '';
                if (city.wundergroundName) {
                    cityName = city.wundergroundName;
                } else {
                    cityName = city.name;
                }
                configsAPI_URLs.push(
                    {
                        name: 'openWeather',
                        city: cityName,
                        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + ',ua&APPID=3e78ad2536ed323a1c1e68f8512485b0'
                    },
                    {
                        name: 'wunderground',
                        city: cityName,
                        url: 'http://api.wunderground.com/api/3a12f2714ca1b6e2/conditions/q/UA/' + cityName + '.json'
                    },
                    {
                        name: 'darkSky',
                        city: cityName,
                        url: 'https://api.darksky.net/forecast/73ca2db6aa635b831a24746659e7c907/' + city.xCords.toFixed(2) + ',' + city.yCords.toFixed(2)
                    }
                );
            });

            return configsAPI_URLs;
        },
        getServicesNames = function () {
            return config.servicesNames;
        },
        getTotalConfig = function () {
            return config;
        };


    return {
        getCitiesURLs: getCitiesURLs,
        getTotalConfig: getTotalConfig,
        getServicesNames: getServicesNames
    };
}());
