'use strict';
var config = require('../config/config.js'),
    MongoClient = require('mongodb').MongoClient,
    urlDB = 'mongodb://localhost:27017/weatherProject',
    Logger = require('../services/logger.js');


module.exports = (function () {

    var prepareDataFromService = function (serviceName, data) {

        switch (serviceName) {
            case "openWeather": {
                prepareDataFromOpenWeather("openWeather", data);
            }
                break;

            case "darkSky": {
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
        console.log(data);
        console.log("-------------" + serviceName + "--------------");
        var fallOut = "";

        switch (data.weather[0].main) {
            case "Clouds":
            case "Clear":
                {
                fallOut = "none";
            }
            break;

            case "Thunderstorm":
            case "Rain": {
                fallOut = "rain";
            }
            break;

            case "Snow": {
                fallOut = "snow";
            }
            break;
        }

        var result = {
            "temp": data.main.temp,
            "pressure": data.main.pressure,
            "humidity": data.main.humidity,
            "windSpeed": data.wind.speed,
            "windDir": data.wind.deg,
            "clouds": data.clouds.all,
            "fallOut": fallOut,
            "sourceAPI": "openWeather",
            "coords": {
                "lon": data.coord.lon,
                "lat": data.coord.lat
            },
            "date": data.dt
        }

            console.log(result);
            return result;
    };

    return {
        prepareDataFromService: prepareDataFromService,
    }

})();
