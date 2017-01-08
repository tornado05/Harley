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
            logger.logError(set.messages.fs.cantReadFile + path);
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
                config.services.forEach(function (service) {
                    switch (service.name) {
                        case "openWeather":
                            configsAPI_URLs.push({
                                name: service.name,
                                city: cityName,
                                url: service.urlPart1 + cityName + service.urlPart2
                            });
                            break;
                        case "wunderground":
                            configsAPI_URLs.push({
                                name: service.name,
                                city: cityName,
                                url: service.urlPart1 + cityName + service.urlPart2
                            });
                            break;
                        case "darkSky":
                            configsAPI_URLs.push({
                                name: service.name,
                                city: cityName,
                                url: service.urlPart1 +  + city.xCords.toFixed(2) + ',' + city.yCords.toFixed(2)
                            });
                            break;
                    }
                });
            });

            return configsAPI_URLs;
        },
        getServicesNames = function () {
            var servicesNames = [];
            config.services.forEach(function (service) {
                servicesNames.push(service.name);
            });
            return servicesNames;
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
