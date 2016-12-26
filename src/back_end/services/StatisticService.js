/*jslint nomen: true */
'use strict';
var config              = require('./ConfigService.js'),
    dataBaseService     = require('./DataBaseService'),
    _                   = require('lodash'),
    logger              = require('./logger.js'),
    pathToDBs           = require('./../config/pathConfig.json');

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
        }
        return lowest;

    },
        maxValue = function (paramName, data, cityNameNeeded) {
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
            }
            return highest;
        },

        avgValue = function (paramName, data, cityNameNeeded) {
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
            }
            return avg / data.length;
        },
        
        serviceDayStatisticByCity = function (searchTime){
            var start = new Date(searchTime.getTime()),
                end = new Date(searchTime.getTime()),
                cities = [];
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            _.each(config.getCitiesURLs(), function (city) {
                cities.push(city.city);
            });

            _.each(_.uniq(cities), function (cityName) {
                _.each(_.uniq(config.getServicesNames()), function(serviceName) {
                    dataBaseService.getServiceStatisticsByCities(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                        parseInt(start.getTime() / 1000, 10), parseInt(end.getTime() / 1000, 10), cityName, serviceName).then(function (dataArr) {
                        //console.info('Data services successfully collected!');

                        var result = {
                            'time': dataArr[0].date,
                            'city' : cityName,
                            'service' : serviceName,
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
                        //console.log(result);
                        dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceDayStatisticsByCity, result);
                    }, function (err) {
                        logger.logError(err);
                    });
                });

            });
        },

        serviceMonthStatisticByCity = function (searchTime) {
            var start = new Date(searchTime.getFullYear(), searchTime.getMonth(), 1),
                end = new Date(searchTime.getFullYear(), searchTime.getMonth() + 1, 0),
                cities = [];
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            _.each(config.getCitiesURLs(), function (city) {
                cities.push(city.city);
            });

            _.each(_.uniq(cities), function (cityName) {
                _.each(_.uniq(config.getServicesNames()), function(serviceName) {
                    dataBaseService.getServiceStatisticsByCities(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                        parseInt(start.getTime() / 1000, 10), parseInt(end.getTime() / 1000, 10), cityName, serviceName).then(function (dataArr) {
                        //console.info('Data services successfully collected!');

                        var result = {
                            'time': dataArr[0].date,
                            'city' : cityName,
                            'service' : serviceName,
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
                        dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceMonthStatisticsByCity, result);
                    }, function (err) {
                        logger.logError(err);
                    });
                });

            });
        },

        cityDayStatistics = function (searchTime) {
            var start = new Date(searchTime.getTime()),
                end = new Date(searchTime.getTime()),
                cities = [];
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            _.each(config.getCitiesURLs(), function (city) {
                cities.push(city.city);
            });

            _.each(_.uniq(cities), function (cityName) {
                dataBaseService.getStatisticsOnCities(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                    parseInt(start.getTime() / 1000, 10), parseInt(end.getTime() / 1000, 10), cityName).then(function (dataArr) {
                    //console.info('Data services successfully collected!');

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
                    dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.CityDayStatistics, result);
                }, function (err) {
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
                dataBaseService.getStatisticsOnCities(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                    parseInt(start.getTime() / 1000, 10), parseInt(end.getTime() / 1000, 10), cityName).then(function (dataArr) {
                    //console.info('Data services successfully collected!');

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
                    dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.CityMonthStatistics, result);
                }, function (err) {
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
                dataBaseService.getStatisticsOnServices(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
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
                    dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceDayStatistics, result);
                }, function (err) {
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
                dataBaseService.getStatisticsOnServices(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                    parseInt(start.getTime() / 1000, 10), parseInt(end.getTime() / 1000, 10), service).then(function (dataArr) {
                    //console.info('Data services successfully collected!');
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
                    dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceMonthStatistics, result);
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