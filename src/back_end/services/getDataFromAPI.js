'use strict';
var request = require('request'),
    config = require('../config/config.js'),
    MongoClient = require('mongodb').MongoClient,
    urlDB = 'mongodb://localhost:27017/weatherProject',
    mapperService = require('../services/mapperService');
// var Logger = require('logger.js');
// var logger = new Logger('./logs/log.txt', false);


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
                console.log(error);
                // logger.logError(error);
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
                MongoClient.connect(urlDB, function (error, db) {
                    if (error) {
                        logger.logError(error);
                    }
                    var collection = db.collection('openWeather');
                    collection.insertOne(data, function (error, result) {
                        if (error) {
                            console.log(error);
                            // logger.logError(error);
                        }
                    });

                    db.close();
                });
            }
                break;
            case "wunderground":
            {
                MongoClient.connect(urlDB, function (error, db) {
                    if (error) {
                        logger.logError(error);
                    }
                    var collection = db.collection('wunderground');
                    collection.insertOne(data, function (error, result) {
                        if (error) {
                            console.log(error);
                            // logger.logError(error);
                        }
                    });

                    db.close();
                });
            }
                break;
            case "darkSky":
            {
                MongoClient.connect(urlDB, function (error, db) {
                    if (error) {
                        logger.logError(error);
                    }var collection = db.collection('darkSky');
                    collection.insertOne(data, function (error, result) {
                        if (error) {
                            console.log(error);
                            // logger.logError(error);
                        }
                    });
                    db.close();
                });
            }
                break;
        }

        console.log("--before mapper service");
        mapperService.prepareDataFromService(serviceName, data);
        console.log("after mapper service--");
    };

    return {
        getWeatherData: getWeatherData
    }
})();

