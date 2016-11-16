'use strict';
var Logger = require('../services/logger'),
    logger = new Logger('../logs/log.txt', false),
    getWeatherFromAPI = require('../services/getDataFromAPI'),
    urlDB = 'mongodb://localhost:27017/weatherProject',
    serviceDB = require ('../services/DataBaseService'),
    mapperService = require('../services/mapperService'),
    dataBaseService = require('../services/DataBaseService'),
    fs = require('fs');

module.exports = (function () {

    var data = [],
        getDataOnlyOnce = false;
    //TODO: To get data from API uncomment this !
    var initialize = function () {
        // if (!getDataOnlyOnce) {
        //     data = getWeatherFromAPI.getWeatherData();
        //     getDataOnlyOnce = true;
        // }
    };
    
    /*    
     Temporary method, if the data can not be taken from the base they are taken from JSON
    */
    var getCurrentWeather = function () {
        var currentWeatherJSONpath = './data/common_data.json',
            result = [];
        // result = dataBaseService.getDataFromDB(urlDB, 'unifiedWeather');
        // console.log(result);
        // if (!result) {
        //     result = readData(currentWeatherJSONpath);
        // }
        result = readData(currentWeatherJSONpath);
        return result;
    };

    var readData = function (path) {
        try {
            var result = fs.readFileSync(path, 'utf8');
            return JSON.parse(result);
        } catch (e) {
            logger.logError("Can't read from file " + path);
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