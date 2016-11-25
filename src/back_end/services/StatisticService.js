'use strict';
var config              = require('../config/config.js'),
    Logger              = require('../services/logger.js'),
    logger              = new Logger('../logs/log.txt', false),
    dataBaseService     = require('../services/DataBaseService'),
    _                   = require('underscore'),
    urlStatisticsDataDB = 'mongodb://localhost:27017/Weather_Statistics',
    urlWeatherDataDB    = 'mongodb://localhost:27017/weatherProject';

module.exports = (function () {

    var dayStatistics = function (serchTime) {
        console.log('it works 111');
        console.log(serchTime);
        var start = new Date(serchTime.getTime()),
            end = new Date(serchTime.getTime()),
            servicesArr = [];
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            console.log(start.getTime());
            console.log(end.getTime());
        _.each(config.getServicesNames(), function (service) {
            dataBaseService.getStatisticsOnServices(urlWeatherDataDB, 'unifiedWeather',
                parseInt(start.getTime() / 1000), parseInt(end.getTime() / 1000), service).then(function (dataArr) {
                console.info('Data services successfully collected!');

                var lowestTempObj = {},
                    highesTempObj = {},
                    lowestHumObj = {},
                    highesHumObj = {},
                    lowestWindSpeedObj = {},
                    highesWindSpeedObj = {},
                    result = {},
                    avgTempVal = 0,
                    avgHumVal = 0,
                    avgWindSpeedVal = 0,
                    lowestTemp = Number.POSITIVE_INFINITY,
                    lowestHum = Number.POSITIVE_INFINITY,
                    lowestWindSpeed = Number.POSITIVE_INFINITY,
                    highestTemp = Number.NEGATIVE_INFINITY,
                    highestHum = Number.NEGATIVE_INFINITY,
                    highestWindSpeed = Number.NEGATIVE_INFINITY;

                _.each(dataArr, function (data) {
                    avgTempVal += data.temp;
                    avgHumVal += data.humidity;
                    avgWindSpeedVal += data.temp;
                    if (data.temp < lowestTemp) {
                        lowestTemp = data.temp;
                        lowestTempObj = {
                            'temp': data.temp,
                            'cords': data.coords
                        }
                    }
                    if (data.temp > highestTemp) {
                        highestTemp = data.temp;
                        highesTempObj = {
                            'temp': data.temp,
                            'cords': data.coords
                        }
                    }
                    if (data.humidity < lowestHum) {
                        lowestHum = data.humidity;
                        lowestHumObj = {
                            'temp': data.humidity,
                            'cords': data.coords
                        }
                    }
                    if (data.humidity > highestHum) {
                        highestHum = data.humidity;
                        highesHumObj = {
                            'temp': data.humidity,
                            'cords': data.coords
                        }
                    }
                    if (data.windSpeed < lowestWindSpeed) {
                        lowestWindSpeed = data.windSpeed;
                        lowestWindSpeedObj = {
                            'temp': data.humidity,
                            'cords': data.coords
                        }
                    }
                    if (data.windSpeed > highestWindSpeed) {
                        highestWindSpeed = data.windSpeed;
                        highesWindSpeedObj = {
                            'temp': data.windSpeed,
                            'source': service,
                            'cords': data.coords
                        }
                    }
                });

                result = {
                    'time': dataArr[0].date,
                    'service' : service,
                    'stat': [{
                        'minTemp': lowestTempObj
                    }, {
                        'maxTemp': highesTempObj
                    }, {
                        'minHum': lowestHumObj
                    }, {
                        'maxHum': highesHumObj
                    }, {
                        'minWindSpeed': lowestWindSpeedObj
                    }, {
                        'maxWindSpeed': highesWindSpeedObj
                    }, {
                        'avgTemp': {
                            'temp': avgTempVal / dataArr.length
                        }
                    }, {
                        'avgHum': {
                            'temp': avgHumVal / dataArr.length
                        }
                    }, {
                        'avgWindSpeed': {
                            'temp': avgWindSpeedVal / dataArr.length
                        }
                    }]
                };
                console.log('result');
                console.log(result);
                console.log('--------------------------------------------------');
                dataBaseService.setDataToDB(urlStatisticsDataDB, 'Day_Statistics', result);
            }, function (err) {
                console.error('Data is not collected!\n', err, err.stack);
            });
        });
    };

    var monthStatistics = function (serchTime) {
        console.log('it works 222');
        console.log(serchTime);
        var start = new Date(serchTime.getTime()),
            end = new Date(serchTime.getTime()),
            servicesArr = [];
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        end.setDate(30);
        end.setHours(23, 59, 59, 999);
        console.log(start.getTime());
        console.log(end.getTime());
        _.each(config.getServicesNames(), function (service) {
            dataBaseService.getStatisticsOnServices(urlWeatherDataDB, 'unifiedWeather',
                parseInt(start.getTime() / 1000), parseInt(end.getTime() / 1000), service).then(function (dataArr) {
                console.info('Data services successfully collected!');

                var lowestTempObj = {},
                    highesTempObj = {},
                    lowestHumObj = {},
                    highesHumObj = {},
                    lowestWindSpeedObj = {},
                    highesWindSpeedObj = {},
                    result = {},
                    avgTempVal = 0,
                    avgHumVal = 0,
                    avgWindSpeedVal = 0,
                    lowestTemp = Number.POSITIVE_INFINITY,
                    lowestHum = Number.POSITIVE_INFINITY,
                    lowestWindSpeed = Number.POSITIVE_INFINITY,
                    highestTemp = Number.NEGATIVE_INFINITY,
                    highestHum = Number.NEGATIVE_INFINITY,
                    highestWindSpeed = Number.NEGATIVE_INFINITY;

                _.each(dataArr, function (data) {
                    avgTempVal += data.temp;
                    avgHumVal += data.humidity;
                    avgWindSpeedVal += data.temp;
                    if (data.temp < lowestTemp) {
                        lowestTemp = data.temp;
                        lowestTempObj = {
                            'temp': data.temp,
                            'cords': data.coords
                        }
                    }
                    if (data.temp > highestTemp) {
                        highestTemp = data.temp;
                        highesTempObj = {
                            'temp': data.temp,
                            'cords': data.coords
                        }
                    }
                    if (data.humidity < lowestHum) {
                        lowestHum = data.humidity;
                        lowestHumObj = {
                            'temp': data.humidity,
                            'cords': data.coords
                        }
                    }
                    if (data.humidity > highestHum) {
                        highestHum = data.humidity;
                        highesHumObj = {
                            'temp': data.humidity,
                            'cords': data.coords
                        }
                    }
                    if (data.windSpeed < lowestWindSpeed) {
                        lowestWindSpeed = data.windSpeed;
                        lowestWindSpeedObj = {
                            'temp': data.humidity,
                            'cords': data.coords
                        }
                    }
                    if (data.windSpeed > highestWindSpeed) {
                        highestWindSpeed = data.windSpeed;
                        highesWindSpeedObj = {
                            'temp': data.windSpeed,
                            'source': service,
                            'cords': data.coords
                        }
                    }
                });

                result = {
                    'time': dataArr[0].date,
                    'service' : service,
                    'stat': [{
                        'minTemp': lowestTempObj
                    }, {
                        'maxTemp': highesTempObj
                    }, {
                        'minHum': lowestHumObj
                    }, {
                        'maxHum': highesHumObj
                    }, {
                        'minWindSpeed': lowestWindSpeedObj
                    }, {
                        'maxWindSpeed': highesWindSpeedObj
                    }, {
                        'avgTemp': {
                            'temp': avgTempVal / dataArr.length
                        }
                    }, {
                        'avgHum': {
                            'temp': avgHumVal / dataArr.length
                        }
                    }, {
                        'avgWindSpeed': {
                            'temp': avgWindSpeedVal / dataArr.length
                        }
                    }]
                };
                console.log(result);
                console.log('--------------------------------------------------');
                dataBaseService.setDataToDB(urlStatisticsDataDB, 'Day_Statistics', result);
            }, function (err) {
                console.error('Data is not collected!\n', err, err.stack);
            });
        });
    };

    var yearStatistics = function () {

    };


    return {
        dayStatistics: dayStatistics,
        monthStatistics: monthStatistics

    }
})();