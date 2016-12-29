'use strict';
var logger = require('./logger.js'),
    set = require('./../config/settings.json'),
    fs = require('fs');

module.exports = (function () {

    var readData = function (path) {
        try {
            var result = fs.readFileSync(path, 'utf8');
            return JSON.parse(result);
        } catch (e) {
            logger.logError(set.message + path);
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
                        name: set.service1,
                        city: cityName,
                        url: set.api1Part1 + cityName + set.api1Part2
                    },
                    {
                        name: set.service2,
                        city: cityName,
                        url: set.api2Part1 + cityName + set.api2Part2
                    },
                    {
                        name: set.service3,
                        city: cityName,
                        url: set.api3 + city.xCords.toFixed(2) + ',' + city.yCords.toFixed(2)
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
