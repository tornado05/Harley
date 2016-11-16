'use strict';
var Logger = require('../services/logger'),
    logger = new Logger('../logs/log.txt', false),
    getWeatherFromAPI = require('../services/getDataFromAPI'),
    urlDB = 'mongodb://localhost:27017/weatherProject',    
    dataBaseService = require('../services/DataBaseService'),
    statisticsService = require('../services/StatisticService'),
    fs = require('fs');;

module.exports = (function () {

    var data = [],
        date = new Date(),
        getDataOnlyOnce = false;
    //TODO: To get data from API uncomment this !
    var initialize = function () {
        statisticsService.dayStatistics(date);
        // if (!getDataOnlyOnce) {
        //     data = getWeatherFromAPI.getWeatherData();
        //     getDataOnlyOnce = true;
        // }
    };
    
    /*    
     Method returns an array of database.
     If the database not available -  returned data from JSON.
    */
    var getCurrentWeather = function () {
        var currentWeatherJSONpath = './data/common_data.json';        
        var result = dataBaseService.getLastRecords(urlDB, 'unifiedWeather').then(function(items) {
            console.info('The promise was fulfilled with items!');            
            return items;
        }, function(err) {
            console.error('The promise was rejected, data from JSON will be return\n', err, err.stack);
            return readData(currentWeatherJSONpath);
        });
        return result;
    };

    var readData = function (path) {
        try {
            var result = fs.readFileSync(path, 'utf8');
            return JSON.parse(result);
        } catch (e) {
            // logger.logError("Can't read from file " + path);
            console.log(e);
            console.log('ERROR');
            return [];
        }
    };

    return {
        initialize: initialize,
        getCurrentWeather: getCurrentWeather
    }
})();