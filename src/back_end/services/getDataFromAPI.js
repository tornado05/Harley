'use strict';
var request                         = require('request'),
    config                          = require('./ConfigService.js'),
    mapperService                   = require('./mapperService'),
    dataBaseService                 = require('./DataBaseService'),
    pathToDBs                       = require('./../config/pathConfig.json'),
    set                             = require('./../config/settings.json'),
    logger                          = require('./logger.js');

module.exports = (function () {
    var setDataDB = function (serviceName, city, data) {
            var unifiedWeather = mapperService.prepareDataFromService(serviceName, city, data);
            dataBaseService.setDataToDB(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName, unifiedWeather);
        },
        requestData = function (city) {
            request(city.url, function (error, response, body) {
                if (error) {
                    logger.logError(error);
                }
                if (!error && response.statusCode === set.variables.succes) {
                    setDataDB(city.name, city.city, JSON.parse(body));
                }
            });
        },
        getWeatherData = function () {
            var date = parseInt((new Date()).getTime() / 1000);
            config.updateSettings("lastWeatherUpdateTime", date);
            // var citiesURLs = config.getCitiesURLs(),
            //     data = [];
            // citiesURLs.forEach(function (city) {
            //     data.push(requestData(city));
            // });
            // return data;
        };
    return {
        getWeatherData: getWeatherData
    };
}());

