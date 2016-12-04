'use strict';
    var logger = require('./../services/logger.js'),
    getWeatherFromAPI   = require('../services/getDataFromAPI'),
    urlStatisticsDataDB = 'mongodb://localhost:27017/Weather_Statistics',
    urlWeatherDataDB    = 'mongodb://localhost:27017/weatherProject',    
    dataBaseService     = require('../services/DataBaseService'),
    statisticsService   = require('../services/StatisticService'),
    mapperService       = require('../services/mapperService'),
    fs                  = require('fs');

module.exports = (function () {

    var data = [],
        date = new Date(),
        getDataOnlyOnce = false,
        currentWeatherJSONpath = './data/common_data.json',
        currentStatJSONpath = './data/serviceDayStatMock.json';

    var initialize = function () {
        //TODO:Set timer to collect statistics for the day/month
        statisticsService.serviceDayStatistics(date);
       statisticsService.serviceMonthStatistics(date);
       statisticsService.cityDayStatistics(date);
        statisticsService.cityMonthStatistics(date);
        //getWeatherFromAPI.getWeatherData();
        
        //TODO: To get data from API uncomment this !
        
        // if (!getDataOnlyOnce) {
        //     data = getWeatherFromAPI.getWeatherData();
        //     getDataOnlyOnce = true;
        // }
        
    };
    
    /**
     *  @desc: Method returns an array of current weather from the database.
     *  If the database not available -  returned mock data from JSON.
     *
    */
    var getCurrentWeather = function () {        
        var currentWeatherJSONpath = './data/common_data.json';        
        var result = dataBaseService.getLastRecords(urlWeatherDataDB, 'unifiedWeather').then(function(items) {
            console.info('The current weather data from DB returned successfully!');
            return items;
        }, function(err) {
            console.error('Something went wrong, data from JSON will be return\n', err, err.stack);
            logger.logError(err);
            return readData(currentWeatherJSONpath);
        });
        return result;
    };
    /**
     * @desc:
     * Method returns an array of day statistic from the database.
     * If the database not available -  returned mock data from JSON.
     */
    var getDaysStatiscticData = function (date) {        
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
        var result = dataBaseService.getAllStatistic(urlStatisticsDataDB, 'Day_Statistics').then(function(items) {
            console.info('All statistic data from DB has been returned successfully!');
            return items;
        }, function(err) {
            console.error('Something went wrong, data from JSON will be return\n', err, err.stack);
            logger.logError(err);
            return readData(currentStatJSONpath);
        });
        return result;

    };

    var readData = function (path) {        
        try {
            var result = fs.readFileSync(path, 'utf8');
            return JSON.parse(result);
        } catch (e) {
            logger.logError("Can't read from file ");
            console.log(e);
            console.log('ERROR');
            return [];
        }
    };

    return {
        initialize: initialize,
        getCurrentWeather: getCurrentWeather,
        getDaysStatiscticData: getDaysStatiscticData
    }
})();