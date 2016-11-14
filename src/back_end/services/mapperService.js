'use strict';
var config = require('../config/config.js'),
    MongoClient = require('mongodb').MongoClient,
    urlDB = 'mongodb://localhost:27017/weatherProject',
    Logger = require('../services/logger.js');


module.exports = (function () {

    var prepareDataFromService = function (serviceName, data) {

        switch (serviceName) {
            case "opeWeather": {
                console.log("-------------openWeather--------------");
                prepareDataFromOpenWeather(data);
            }
                break;

            case "darkSKY": {
                console.log("this will be darkSKY");
            }

                break;

            case "wunderground": {
                console.log("this will be wunderground");
            }

                break;

        }

    };

    var prepareDataFromOpenWeather = function (serviceName, data) {
        console.log("-------------openWeather--------------");
        console.log(data);
        var fallOut = "";

        // case for fallOut

          // return {
          //         "temp": data.main.temp,
          //         "presure": data.main.presure,
          //         "humidity": data.main.humidity,
          //         "windSpeed": data.wind.speed,
          //         "windDir": data.wind.deg,
          //         "clouds": data.clouds.all,
          //         "fallOut": fallOut,
          //         "sourceAPI": "openWeather",
          //         "coords": {
          //             "lon": data.coord.lon,
          //             "lat": data.coord.lat
          //         },
          //         "date": data.dt
          // }
    };

    return {
        prepareDataFromService: prepareDataFromService,
    }

})();
