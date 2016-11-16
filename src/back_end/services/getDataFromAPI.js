'use strict';
var request = require('request'),
    config = require('../config/config.js'),
    MongoClient = require('mongodb').MongoClient,
    urlDB = 'mongodb://localhost:27017/weatherProject',
    mapperService = require('../services/mapperService'),
    dataBaseService = require('../services/DataBaseService'),
    dataAfterMapperCollectionName = 'unifiedWeather';
 var Logger = require('../services/logger.js');
 var logger = new Logger('../logs/log.txt', false);


module.exports = (function () {

    var getWeatherData = function () {
        var citiesURLs = config.getCitiesURLs(),
            data = [];

        citiesURLs.forEach(function (obj) {
            data.push(requestData(obj));
        });

        return data;
    };

    var requestData = function (obj) {
        var result = request(obj.url, function (error, response, body) {
            if (error) {
                console.log("this is - " + error);
                 logger.logError(error);
            }
            if (!error && response.statusCode === 200) {
                setDataDB(obj.name, JSON.parse(body));
            }
        });
    };
    var setDataDB = function (serviceName, data) {

        switch (serviceName) {
            case "openWeather":
            {
                dataBaseService.setDataToDB(urlDB, serviceName, data);
            }
                break;
            case "wunderground":
            {
                dataBaseService.setDataToDB(urlDB, serviceName, data);
            }
                break;
            case "darkSky":
            {
                dataBaseService.setDataToDB(urlDB, serviceName, data);
            }
                break;
        }
        var unifiedWeather = mapperService.prepareDataFromService(serviceName, data);
        dataBaseService.setDataToDB(urlDB, 'unifiedWeather', unifiedWeather);
    };

    return {
        getWeatherData: getWeatherData
    }
})();

