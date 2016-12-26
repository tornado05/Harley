'use strict';
var request                         = require('request'),
    config                          = require('./ConfigService.js'),
    MongoClient                     = require('mongodb').MongoClient,
    mapperService                   = require('./mapperService'),
    dataBaseService                 = require('./DataBaseService'),
    pathToDBs                       = require('./../config/pathConfig.json'),
    logger                          = require('./logger.js');

module.exports = (function () {
    var setDataDB = function (serviceName, city, data) {
        dataBaseService.setDataToDB(pathToDBs.urlWeatherDataDB, serviceName, data);
        var unifiedWeather = mapperService.prepareDataFromService(serviceName, city, data);
        dataBaseService.setDataToDB(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName, unifiedWeather);
    },

        requestData = function (obj) {
            request(obj.url, function (error, response, body) {
                if (error) {
                    logger.logError(error);
                }
                if (!error && response.statusCode === 200) {
                    setDataDB(obj.name, obj.city, JSON.parse(body));
                }
            });
        },

        getWeatherData = function () {
            var citiesURLs = config.getCitiesURLs(),
                data = [];
            citiesURLs.forEach(function (obj) {
                data.push(requestData(obj));
            });
            return data;
        };

    return {
        getWeatherData: getWeatherData
    };
}());

