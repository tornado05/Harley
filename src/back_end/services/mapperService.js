'use strict';
var config = require('../config/config.js'),
    MongoClient = require('mongodb').MongoClient,
    urlDB = 'mongodb://localhost:27017/weatherProject',
    Logger = require('../services/logger.js');


module.exports = (function () {

    var prepareDataFromService = function (serviceName, data) {
        var result = {};

        switch (serviceName) {
            case "openWeather":
            {
                result = prepareDataFromOpenWeather("openWeather", data);
            }
                break;

            case "darkSky":
            {
                result = prepareDataFromDarkSky("darkSky", data);
            }
                break;

            case "wunderground":
            {
                result = prepareDataFromWunderground("wunderground", data);
            }
                break;

        }
        console.log(result);
        return result;

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
            case "Rain":
            {
                fallOut = "rain";
            }
                break;

            case "Snow":
            {
                fallOut = "snow";
            }
                break;
        }

        var tempInCelsius = parseFloat((data.main.temp - 273.15).toFixed(2));
        var windSpeedInKmH = parseFloat(((data.wind.speed * 3600) / 1000).toFixed(2));

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

    var prepareDataFromWunderground = function (serviceName, data) {
        console.log("-------------" + serviceName + "--------------");
        var fallOut = "";
        console.log(data);
        var humidity = (data.current_observation.relative_humidity).replace(/%/g, '');
        humidity = parseInt(humidity);

        var getIcon = function () {
            var VRegExp = new RegExp(/Cloud|cloud|sun|Sun|clear|Clear|hazy|Hazy/);
            var result = VRegExp.test(data.current_observation.icon);
            return result;
        };

        if (getIcon(data.current_observation.icon) == true) {
            fallOut = "none";
        };


        // не уверенна в правильности, так как нет нормальной документации с описанием всех возможных значений icon
        switch (data.current_observation.icon) {
            case "thunderstorm":
            case "rain":
            {
                fallOut = "rain";
            }

                break;

            case "snow":
            case "sleet":
            {
                fallOut = "snow";
            }
                break;
        }


        var result = {
            "temp": parseFloat(data.current_observation.temp_c),
            "pressure": parseFloat(data.current_observation.pressure_mb),
            "humidity": humidity,
            "windSpeed": parseFloat(data.current_observation.wind_gust_kph),
            "windDir": data.current_observation.wind_degrees,
            "clouds": null, // не знаю какое значение указывать здесь, данных из сервиса нет
            "fallOut": fallOut,
            "sourceAPI": "wunderground",
            "coords": {
                "lon": parseFloat(data.current_observation.display_location.longitude),
                "lat": parseFloat(data.current_observation.display_location.latitude)
            },
            "date": parseFloat(data.current_observation.local_epoch)
        };

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
            case "rain":
            {
                fallOut = "rain";
            }
                break;

            case "sleet":
            case "snow":
            {
                fallOut = "snow";
            }
                break;
        }

        var tempInCelsius = parseFloat(((data.currently.temperature - 32) * (5 / 9)).toFixed(2));
        var windSpeedInKmH = parseFloat(((data.currently.windSpeed) * 1.609344).toFixed(2));
        var humidity = data.currently.humidity * 100;
        var cloudsInPercent = data.currently.cloudCover * 100;

        var result = {
            "temp": tempInCelsius,
            "pressure": data.currently.pressure,
            "humidity": humidity,
            "windSpeed": windSpeedInKmH,
            "windDir": data.currently.windBearing,
            "clouds": cloudsInPercent,
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
        prepareDataFromService: prepareDataFromService
    }

})();
