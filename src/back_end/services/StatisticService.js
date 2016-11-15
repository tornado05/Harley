'use strict';
var config = require('../config/config.js'),
    Logger = require('../services/logger.js'),
    logger = new Logger('../logs/log.txt', false),
    dataBaseService = require('../services/DataBaseService'),
    urlStatistics = 'mongodb://localhost:27017/weatherProject';

module.exports = (function () {


    var dayStatistics = function () {
        
        var data = [];
        
        dataBaseService.getDataFromDB(urlDB, 'unifiedWeather').then(function(items) {
            console.info('The promise was fulfilled with items!');
            // console.log(items);
            // return items;
        }, function(err) {
            console.error('The promise was rejected', err, err.stack);
            return readData(currentWeatherJSONpath);
        });


        dataBaseService.setDataToDB(urlDB, serviceName, data);
    };

    var monthStatistics = function () {

    };

    var yearStatistics = function () {

    };


    return {

    }
})();