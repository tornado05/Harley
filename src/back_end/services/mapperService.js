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
                prepareDataFromDarkSky("darkSky", data);
            }
                break;

            case "wunderground": {
                console.log("this will be wunderground");
            }

                break;

        }

    };

    var prepareDataFromOpenWeather = function (serviceName, data) {
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

        var tempInCelsius = (data.main.temp - 273.15).toFixed(2);
        var windSpeedInKmH = ((data.wind.speed * 3600) / 1000).toFixed(2);

        var result = {
            "temp": tempInCelsius,
            "pressure": data.main.pressure,
            "humidity": data.main.humidity,
            "windSpeed": windSpeedInKmH,
            "windDir": data.wind.deg,
            "clouds": data.clouds.all,
            "fallOut": fallOut,
            "sourceAPI": "openWeather",
            "coords": {
                "lon": data.coord.lon,
                "lat": data.coord.lat
            },
            "date": data.dt
        };
         console.log(result);
         return result;
    };

    var prepareDataFromDarkSky = function (serviceName, data) {
        console.log("-------------" + serviceName + "--------------");
        var fallOut = "";

        switch (data.currently.icon) {
            case "clear-day":
            case "clear-night":
            case "fog":
            case "wind":
            case "cloudy":
            case "partly-cloudy-day":
            case "partly-cloudy-night":
            {
                fallOut = "none";
            }
                break;

            case "thunderstorm":
            case "rain": {
                fallOut = "rain";
            }
                break;

            case "sleet":
            case "snow": {
                fallOut = "snow";
            }
                break;
        }

        var tempInCelsius = ((data.currently.temperature - 32) * (5/9)).toFixed(2);
        var windSpeedInKmH = ((data.currently.windSpeed) * 1.609344).toFixed(2);
        var humidity = data.currently.humidity * 100;

        var result = {
            "temp": tempInCelsius,
            "pressure": data.currently.pressure,
            "humidity": humidity,
            "windSpeed": windSpeedInKmH,
            "windDir": data.currently.windBearing,
            "clouds": data.currently.cloudCover,
            "fallOut": fallOut,
            "sourceAPI": "darkSky",
            "coords": {
                "lon": data.longitude,
                "lat": data.latitude
            },
            "date": data.currently.time
        };

        console.log(result);
        return result;
    };

    return {
        prepareDataFromService: prepareDataFromService,
    }

})();
