/*jslint nomen: true */
'use strict';
var config              = require('../config/config.js'),
    dataBaseService     = require('../services/DataBaseService'),
    _                   = require('underscore'),
    logger              = require('./../services/logger.js'),
    urlStatisticsDataDB = 'mongodb://localhost:27017/Weather_Statistics',
    urlWeatherDataDB    = 'mongodb://localhost:27017/weatherProject';

module.exports = (function () {

    var minValue = function (paramName, data, cityNameNeeded) {
        var lowest      = Number.POSITIVE_INFINITY,
            fieldName   = 'min_' + paramName,
            result      = {},
            city        = '';
        _.each(data, function (item) {
            if (item[paramName] < lowest) {
                lowest = item[paramName];
                city = item.cityName;
            }
            if (cityNameNeeded) {
                result[fieldName] = lowest;
                result['cityName'] = city;
            }
        });
        if (cityNameNeeded) {
            return result;
        } else {
            return lowest;
        }
    };
    var maxValue = function (paramName, data, cityNameNeeded) {
        var highest     = Number.NEGATIVE_INFINITY,
            fieldName   = 'max_' + paramName,
            result      = {},
            city        = '';
        _.each(data, function (item) {
            if (item[paramName] > highest) {
                highest = item[paramName];
                city = item.cityName;
            }
            if (cityNameNeeded) {
                result[fieldName] = highest;
                result['cityName'] = city;
            }
        });
        if (cityNameNeeded) {
            return result;
        } else {
            return highest;
        }
    };

    var avgValue = function (paramName, data, cityNameNeeded) {
        var avg         = 0,
            fieldName   = 'avg_' + paramName,
            result      = {};
        _.each(data, function (item) {
            avg += item[paramName];
            if (cityNameNeeded) {
                result[fieldName] = avg / data.length;
                result['cityName'] = item.cityName;
            }
        });
        if (cityNameNeeded) {
            return result;
        } else {
            return avg / data.length;
        }
    };


    var cityDayStatistics = function (searchTime) {
        var start = new Date(searchTime.getTime()),
            end = new Date(searchTime.getTime()),
            cities = [];
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        _.each(config.getCitiesURLs(), function (city) {
            cities.push(city.city);
        });

        _.each(_.uniq(cities), function (cityName) {
            dataBaseService.getStatisticsOnCities(urlWeatherDataDB, 'unifiedWeather',
                parseInt(start.getTime() / 1000, 10), parseInt(end.getTime() / 1000, 10), cityName).then(function (dataArr) {
                console.info('Data services successfully collected!');

                var result = {
                    'time': dataArr[0].date,
                    'city' : cityName,
                    'stat': [{
                        'minTemp': minValue('temp', dataArr)
                    }, {
                        'maxTemp': maxValue('temp', dataArr)
                    }, {
                        'minHum': minValue('humidity', dataArr)
                    }, {
                        'maxHum': maxValue('humidity', dataArr)
                    }, {
                        'minWindSpeed': minValue('windSpeed', dataArr)
                    }, {
                        'maxWindSpeed': maxValue('windSpeed', dataArr)
                    }, {
                        'avgTemp': {
                            'temp': avgValue('temp', dataArr)
                        }
                    }, {
                        'avgHum': {
                            'hum': avgValue('humidity', dataArr)
                        }
                    }, {
                        'avgWindSpeed': {
                            'windSpeed': avgValue('windSpeed', dataArr)
                        }
                    }]
                };
                dataBaseService.setDataToDB(urlStatisticsDataDB, 'City_Day_Statistics', result);
            }, function (err) {
                console.error('Data is not collected!\n', err, err.stack);
                logger.logError(err);
            });
        });
    },

    cityMonthStatistics = function (searchTime) {
        var start = new Date(searchTime.getFullYear(), searchTime.getMonth(), 1),
            end = new Date(searchTime.getFullYear(), searchTime.getMonth() + 1, 0),
            cities = [];
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        _.each(config.getCitiesURLs(), function (city) {
            cities.push(city.city);
        });

        _.each(_.uniq(cities), function (cityName) {
            dataBaseService.getStatisticsOnCities(urlWeatherDataDB, 'unifiedWeather',
                parseInt(start.getTime() / 1000, 10), parseInt(end.getTime() / 1000, 10), cityName).then(function (dataArr) {
                console.info('Data services successfully collected!');

                var result = {
                    'time': dataArr[0].date,
                    'city' : cityName,
                    'stat': [{
                        'minTemp': minValue('temp', dataArr)
                    }, {
                        'maxTemp': maxValue('temp', dataArr)
                    }, {
                        'minHum': minValue('humidity', dataArr)
                    }, {
                        'maxHum': maxValue('humidity', dataArr)
                    }, {
                        'minWindSpeed': minValue('windSpeed', dataArr)
                    }, {
                        'maxWindSpeed': maxValue('windSpeed', dataArr)
                    }, {
                        'avgTemp': {
                            'temp': avgValue('temp', dataArr)
                        }
                    }, {
                        'avgHum': {
                            'hum': avgValue('humidity', dataArr)
                        }
                    }, {
                        'avgWindSpeed': {
                            'windSpeed': avgValue('windSpeed', dataArr)
                        }
                    }]
                };
                dataBaseService.setDataToDB(urlStatisticsDataDB, 'City_Month_Statistics', result);
            }, function (err) {
                console.error('Data is not collected!\n', err, err.stack);
                logger.logError(err);
            });
        });
    },

    serviceDayStatistics = function (searchTime) {
        var start = new Date(searchTime.getTime()),
            end = new Date(searchTime.getTime());
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        _.each(config.getServicesNames(), function (service) {
            dataBaseService.getStatisticsOnServices(urlWeatherDataDB, 'unifiedWeather',
                parseInt(start.getTime() / 1000, 10), parseInt(end.getTime() / 1000, 10), service).then(function (dataArr) {
                console.info('Data services successfully collected!');
                var result = {
                    'time': dataArr[0].date,
                    'service' : service,
                    'stat': [{
                        'minTemp': minValue('temp', dataArr, true)
                    }, {
                        'maxTemp': maxValue('temp', dataArr, true)
                    }, {
                        'minHum': minValue('humidity', dataArr, true)
                    }, {
                        'maxHum': maxValue('humidity', dataArr, true)
                    }, {
                        'minWindSpeed': minValue('windSpeed', dataArr, true)
                    }, {
                        'maxWindSpeed': maxValue('windSpeed', dataArr, true)
                    }, {
                        'avgTemp': {
                            'temp': avgValue('temp', dataArr, true)
                        }
                    }, {
                        'avgHum': {
                            'hum': avgValue('humidity', dataArr, true)
                        }
                    }, {
                        'avgWindSpeed': {
                            'windSpeed': avgValue('windSpeed', dataArr, true)
                        }
                    }]
                };
                dataBaseService.setDataToDB(urlStatisticsDataDB, 'Service_Day_Statistics', result);
            }, function (err) {
                console.error('Data is not collected!\n', err, err.stack);
                logger.logError(err);
            });
        });
    },

    serviceMonthStatistics = function (searchTime) {
        var start = new Date(searchTime.getFullYear(), searchTime.getMonth(), 1),
            end = new Date(searchTime.getFullYear(), searchTime.getMonth() + 1, 0);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        _.each(config.getServicesNames(), function (service) {
            dataBaseService.getStatisticsOnServices(urlWeatherDataDB, 'unifiedWeather',
                parseInt(start.getTime() / 1000, 10), parseInt(end.getTime() / 1000, 10), service).then(function (dataArr) {
                console.info('Data services successfully collected!');
                var result = {
                    'time': dataArr[0].date,
                    'service' : service,
                    'stat': [{
                        'minTemp': minValue('temp', dataArr, true)
                    }, {
                        'maxTemp': maxValue('temp', dataArr, true)
                    }, {
                        'minHum': minValue('humidity', dataArr, true)
                    }, {
                        'maxHum': maxValue('humidity', dataArr, true)
                    }, {
                        'minWindSpeed': minValue('windSpeed', dataArr, true)
                    }, {
                        'maxWindSpeed': maxValue('windSpeed', dataArr, true)
                    }, {
                        'avgTemp': {
                            'temp': avgValue('temp', dataArr, true)
                        }
                    }, {
                        'avgHum': {
                            'hum': avgValue('humidity', dataArr, true)
                        }
                    }, {
                        'avgWindSpeed': {
                            'windSpeed': avgValue('windSpeed', dataArr, true)
                        }
                    }]
                };
                dataBaseService.setDataToDB(urlStatisticsDataDB, 'Service_Month_Statistics', result);
            }, function (err) {
                console.error('Data is not collected!\n', err, err.stack);
                logger.logError(err);
            });
        });
    };

    return {
        serviceDayStatistics: serviceDayStatistics,
        serviceMonthStatistics: serviceMonthStatistics,
        cityDayStatistics: cityDayStatistics,
        cityMonthStatistics: cityMonthStatistics
    };
}());