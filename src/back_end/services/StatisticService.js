/*jslint nomen: true */
'use strict';
var config              = require('./ConfigService.js'),
    dataBaseService     = require('./DataBaseService'),
    _                   = require('lodash'),
    logger              = require('./logger.js'),
    set                 = require('./../config/settings.json'),
    pathToDBs           = require('./../config/pathConfig.json');
module.exports = (function () {
    var  minValue = function (paramName, data, cityNameNeeded) {
            var lowest      = Number.POSITIVE_INFINITY,
                fieldName   = set.variables.min_ + paramName,
                result      = {},
                city        = '';
            _.each(data, function (item) {
                if (item[paramName] < lowest) {
                    lowest = item[paramName];
                    city = item.cityName;
                }
                if (cityNameNeeded) {
                    result[fieldName] = lowest;
                    result.cityName = city;
                }
            });
            if (cityNameNeeded) {
                return result;
            }
            return lowest;

        },
        maxValue = function (paramName, data, cityNameNeeded) {
            var highest     = Number.NEGATIVE_INFINITY,
                fieldName   = set.variables.max_ + paramName,
                result      = {},
                city        = '';
            _.each(data, function (item) {
                if (item[paramName] > highest) {
                    highest = item[paramName];
                    city = item.cityName;
                }
                if (cityNameNeeded) {
                    result[fieldName] = highest;
                    result.cityName = city;
                }
            });
            if (cityNameNeeded) {
                return result;
            }
            return highest;
        },

        avgValue = function (paramName, data, cityNameNeeded) {
            var avg         = 0,
                fieldName   = set.variables.avg + paramName,
                result      = {};
            _.each(data, function (item) {
                avg += item[paramName];
                if (cityNameNeeded) {
                    result[fieldName] = avg / data.length;
                    result.cityName = item.cityName;
                }
            });
            if (cityNameNeeded) {
                return result;
            }
            return avg / data.length;
        },
        result = function (dataArr, cityName, serviceName) {
            var output,
                obj1 = {
                    time: dataArr[0].date,
                    city : cityName,
                    service : serviceName
                },
                obj2 = {
                    time: dataArr[0].date,
                    city : cityName
                },
                obj3 = {
                    time: dataArr[0].date,
                    service : serviceName
                },
                obj4 = {
                    temp: {
                        min: minValue(set.variables.temp, dataArr),
                        max: maxValue(set.variables.temp, dataArr),
                        avg: avgValue(set.variables.temp, dataArr)
                    },
                    hum: {
                        min: minValue(set.variables.humidity, dataArr),
                        max: maxValue(set.variables.humidity, dataArr),
                        avg: avgValue(set.variables.humidity, dataArr)
                    },
                    windSpeed: {
                        min: minValue(set.variables.windSpeed, dataArr),
                        max: maxValue(set.variables.windSpeed, dataArr),
                        avg: avgValue(set.variables.windSpeed, dataArr)
                    }
                };
            if (cityName !== 0 && serviceName !== 0) {
                obj1.stat = obj4;
                output = obj1;
            } else if (serviceName === 0 && cityName !== 0) {
                obj2.stat = obj4;
                output = obj2;
            } else if (serviceName !== 0 && cityName === 0) {
                obj3.stat = obj4;
                output = obj3;
            }
            return output;
        },

        getTime = function (searchTime, timePeriodNeeded) {
            var dayStart    = new Date(),
                dayEnd      = new Date();
            switch (timePeriodNeeded) {
                case "day": {
                    dayStart    = new Date(searchTime.getTime());
                    dayEnd      = new Date(searchTime.getTime());
                }
                break;
                case "month": {
                    dayStart = new Date(searchTime.getFullYear(), searchTime.getMonth(), 1);
                    dayEnd = new Date(searchTime.getFullYear(), searchTime.getMonth() + 1, 0);
                }
                break;
            }
            dayStart.setHours(set.dayStart.hour, set.dayStart.mins, set.dayStart.sec, set.dayStart.mSec);
            dayEnd.setHours(set.dayEnd.hour, set.dayEnd.mins, set.dayEnd.sec, set.dayEnd.mSec);
            return {
                dayStart: parseInt(dayStart.getTime() / set.variables.mSecToSec, set.variables.decimal),
                dayEnd: parseInt(dayEnd.getTime() / set.variables.mSecToSec, set.variables.decimal)
            };
        },
        serviceDayStatisticByCity = function (searchTime) {
            var cities = [],
                time = getTime(searchTime, "day");
            _.each(config.getCitiesURLs(), function (city) {
                cities.push(city.city);
            });
            _.each(_.uniq(cities), function (cityName) {
                _.each(_.uniq(config.getServicesNames()), function (serviceName) {
                    dataBaseService.getServiceStatisticsByCities(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                        time.dayStart, time.dayEnd, cityName, serviceName).then(function (dataArr) {
                        console.info('Data services successfully collected!');
                        dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceDayStatisticsByCity, result(dataArr, cityName, serviceName));
                    }, function (err) {
                        logger.logError(err);
                    });
                });

            });
        },
        serviceMonthStatisticByCity = function (searchTime) {
            var time = getTime(searchTime, "month"),
                cities = [];
            _.each(config.getCitiesURLs(), function (city) {
                cities.push(city.city);
            });
            _.each(_.uniq(cities), function (cityName) {
                _.each(_.uniq(config.getServicesNames()), function (serviceName) {
                    dataBaseService.getServiceStatisticsByCities(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                        time.dayStart, time.dayEnd, cityName, serviceName).then(function (dataArr) {
                        console.info('Data services successfully collected!');
                        dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceMonthStatisticsByCity, result(dataArr, cityName, serviceName));
                    }, function (err) {
                        logger.logError(err);
                    });
                });

            });
        },
        cityDayStatistics = function (searchTime) {
            var service = 0,
                time = getTime(searchTime, "day"),
                cities = [];
            _.each(config.getCitiesURLs(), function (city) {
                cities.push(city.city);
            });
            _.each(_.uniq(cities), function (cityName) {
                dataBaseService.getStatisticsOnCities(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                    time.dayStart, time.dayEnd, cityName).then(function (dataArr) {
                    console.info('Data services successfully collected!');
                    dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.CityDayStatistics, result(dataArr, cityName, service));
                }, function (err) {
                    logger.logError(err);
                });
            });
        },
        cityMonthStatistics = function (searchTime) {
            var service = 0,
                time = getTime(searchTime, "month"),
                cities = [];
            _.each(config.getCitiesURLs(), function (city) {
                cities.push(city.city);
            });
            _.each(_.uniq(cities), function (cityName) {
                dataBaseService.getStatisticsOnCities(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                    time.dayStart, time.dayEnd, cityName).then(function (dataArr) {
                    console.info('Data services successfully collected!');
                    dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.CityMonthStatistics, result(dataArr, cityName, service));
                }, function (err) {
                    logger.logError(err);
                });
            });
        },
        serviceDayStatistics = function (searchTime) {
            var cityName = 0,
                time = getTime(searchTime, "day");
            _.each(config.getServicesNames(), function (service) {
                dataBaseService.getStatisticsOnServices(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                    time.dayStart, time.dayEnd, service).then(function (dataArr) {
                    console.info('Data services successfully collected!');
                    dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceDayStatistics, result(dataArr, cityName, service));
                }, function (err) {
                    logger.logError(err);
                });
            });
        },
        serviceMonthStatistics = function (searchTime) {
            var cityName = 0,
                time = getTime(searchTime, "month");
            _.each(config.getServicesNames(), function (service) {
                dataBaseService.getStatisticsOnServices(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                    time.dayStart, time.dayEnd, service).then(function (dataArr) {
                    console.info('Data services successfully collected!');
                    dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceMonthStatistics, result(dataArr, cityName, service));
                }, function (err) {
                    logger.logError(err);
                });
            });
        };

    return {
        serviceDayStatistics: serviceDayStatistics,
        serviceMonthStatistics: serviceMonthStatistics,
        cityDayStatistics: cityDayStatistics,
        cityMonthStatistics: cityMonthStatistics,
        serviceDayStatisticByCity: serviceDayStatisticByCity,
        serviceMonthStatisticByCity: serviceMonthStatisticByCity
    };
}());