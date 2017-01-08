'use strict';
var logger              = require('./../services/logger.js'),
    getWeatherFromAPI   = require('./../services/getDataFromAPI'),
    dataBaseService     = require('./../services/DataBaseService'),
    statisticsService   = require('./../services/StatisticService'),
    pathToDBs           = require('./../config/pathConfig.json'),
    set                 = require('./../config/settings.json'),
    fs                  = require('fs');

module.exports = (function () {
    var date = new Date();
    var initialize = function () {
            //TODO:Set timer to collect statistics for the day/month
            //     statisticsService.serviceDayStatistics(date);
            //     statisticsService.serviceMonthStatistics(date);
            //     statisticsService.cityDayStatistics(date);
            //     statisticsService.cityMonthStatistics(date);
            //     statisticsService.serviceDayStatisticByCity(date);
            //     statisticsService.serviceMonthStatisticByCity(date);
            //TODO: To get data from API uncomment this !
            //    getWeatherFromAPI.getWeatherData();
        };
    return {
        initialize: initialize
    };
}());