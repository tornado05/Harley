'use strict';
var logger              = require('./../services/logger.js'),
    getWeatherFromAPI   = require('./../services/getDataFromAPI'),
    dataBaseService     = require('./../services/DataBaseService'),
    statisticsService   = require('./../services/StatisticService'),
    pathToDBs           = require('./../config/pathConfig.json'),
    set                 = require('./../config/settings.json'),
    config              = require('./../services/ConfigService.js'),
    fs                  = require('fs'),
    _                   = require('lodash');

module.exports = (function () {
    var data = [],
        date = new Date(),

        readData = function (path) {
            try {
                var result = fs.readFileSync(path, 'utf8');
                return JSON.parse(result);
            } catch (e) {
                logger.logError(set.messages.fs.cantReadFile + path);
                return [];
            }
        },

    /**
     *  @desc: temporary methods to return data of MOCK.
     *
     *
     */
        getServiceMonthStat = function () {
            var path = './data/serviceMonthStatMock.json';
            return readData(path);
        },
        getCityDayStat = function () {
            var path = './data/cityDayStatMock.json';
            return readData(path);
        },
        getCityMonthStat = function () {
            var path = './data/cityMonthStatMock.json';
            return readData(path);
        },
    /**
     *  @desc: Method returns an array of current weather from the database.
     *  If the database not available -  returned mock data from JSON.
     *
     */
        getCurrentWeather = function () {
            var count = config.countFields();
            var result = dataBaseService.getLastRecords(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName, count).then(function (items) {
                console.info('The current weather data from DB returned successfully!');
                return items;
            }, function (err) {
                logger.logError(err);
                return readData('./data/common_data.json');
            });
            return result;
        },
    /**
     * @desc:
     * Method returns an array of day statistic from the database.
     * If the database not available -  returned mock data from JSON.
     */
        getServiceDayStat = function (date) {
            var start = new Date(date.getTime()),
                end = new Date(date.getTime());
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
    //TODO: Use this method after router get params
    //     var result = dataBaseService.getLastRecords(urlStatisticsDataDB, 'Day_Statistics', start, end).then(function(items) {
    //         console.info('The statistic data from DB returned successfully!');
    //         return items;
    //     }, function(err) {
    //         console.error('Something went wrong, data from JSON will be return\n', err, err.stack);
    //         return readData(currentStatJSONpath);
    //     });
    //     return result;
            var result = dataBaseService.getAllStatistic(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceDayStatistics).then(function (items) {
                console.info('All statistic data from DB has been returned successfully!');
                return items;
            }, function (err) {
                logger.logError(err);
                var path = './data/serviceDayStatMock.json';
                return readData(path);
            });
            return result;
        },
        getServiceStatByCities = function (dateFrom, dateTo, city) {
            var date = getDate(dateFrom, dateTo);
            var result =  dataBaseService.getServiceStatisticsByCities(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceDayStatisticsByCity, date.start, date.end, city).then(function (items) {
                console.info('All statistic data from DB has been returned successfully!');
                return items;
            }, function (err) {
                logger.logError(err);
                var path = './data/serviceDayStatByCities.json';
                return readData(path);
            });
            return result;
        },
        getServiceMonthStatByCities = function (date) {
            var start = new Date(date.getTime()),
                end = new Date(date.getTime());
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            //TODO: Use this method after router get params
            //     var result = dataBaseService.getLastRecords(urlStatisticsDataDB, 'Day_Statistics', start, end).then(function(items) {
            //         console.info('The statistic data from DB returned successfully!');
            //         return items;
            //     }, function(err) {
            //         console.error('Something went wrong, data from JSON will be return\n', err, err.stack);
            //         return readData(currentStatJSONpath);
            //     });
            //     return result;
            var result = dataBaseService.getAllStatistic(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceMonthStatisticsByCity).then(function (items) {
                console.info('All statistic data from DB has been returned successfully!');
                return items;
            }, function (err) {
                logger.logError(err);
                var path = './data/serviceMonthStatByCities.json';
                return readData(path);
            });
            return result;
        },
        getDate = function (dateFrom, dateTo) {
            if (_.isString(dateTo)) {
                var start = new Date(dateFrom),
                    end = new Date(dateTo);
            } else {
                var start = new Date(dateFrom),
                    end = new Date(dateFrom);
            }
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            return {
                start: parseInt(start.getTime()/1000),
                end: parseInt(end.getTime()/1000)
            }
        };

    return {
        getCurrentWeather: getCurrentWeather,
        getServiceDayStat: getServiceDayStat,
        getServiceMonthStat: getServiceMonthStat,
        getCityDayStat: getCityDayStat,
        getCityMonthStat: getCityMonthStat,
        getServiceStatByCities: getServiceStatByCities,
        getServiceMonthStatByCities: getServiceMonthStatByCities
    };
}());