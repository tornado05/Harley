'use strict';
var config = require('../config/config.js'),
    Logger = require('../services/logger.js'),
    logger = new Logger('../logs/log.txt', false),
    dataBaseService = require('../services/DataBaseService'),
    urlStatisticsDataDB = 'mongodb://localhost:27017/Weather_Statistics',
    urlWeatherDataDB = 'mongodb://localhost:27017/weatherProject';

module.exports = (function () {


    var dayStatistics = function (serchTime) {
        var start = new Date(serchTime.getTime());
        start.setHours(0,0,0,0);
        var end = new Date(serchTime.getTime());
        end.setHours(23,59,59,999);
        dataBaseService.getDayStatistics(urlWeatherDataDB, 'unifiedWeather', parseInt(start.getTime()/1000), parseInt(end.getTime()/1000)).then(function(items) {
            console.info('The promise was fulfilled with items!');
            var tempArray = [],
                humArray = [],
                windSpeedArray = [];

            items.forEach(function (item) {
                tempArray.push({
                    'time' : item.date,
                    'service' : item.sourceAPI,
                    'temp' : item.temp,
                    'coords' : item.coords
                });
                humArray.push({
                    'time' : item.date,
                    'service' : item.sourceAPI,
                    'humidity' : item.humidity,
                    'coords' : item.coords
                });
                windSpeedArray.push({
                    'time' : item.date,
                    'service' : item.sourceAPI,
                    'windSpeed' : item.windSpeed,
                    'coords' : item.coords
                })
            });
            console.log(tempArray);
        }, function(err) {
            console.error('The promise was rejected', err, err.stack);
        });

        // dataBaseService.setDataToDB(urlStatisticsDataDB, 'Day_Statistics', data);

    };

    var monthStatistics = function () {

    };

    var yearStatistics = function () {

    };


    return {
        dayStatistics: dayStatistics
    }
})();