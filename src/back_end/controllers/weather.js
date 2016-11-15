'use strict';
var Logger = require('../services/logger'),
    logger = new Logger('../logs/log.txt', false),
    getWeatherFromAPI = require('../services/getDataFromAPI'),
    urlDB = 'mongodb://localhost:27017/weatherProject',
    serviceDB = require ('../services/DataBaseService'),
    dataBaseService = require('../services/DataBaseService');

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

        dataBaseService.getDataFromDB(urlDB, 'unifiedWeather').then(function(items) {
            console.info('The promise was fulfilled with items!');
            // console.log(items);
            setInterval(function () {
                return items;
            }, 1000);
        }, function(err) {
            console.error('The promise was rejected', err, err.stack);
            return readData(currentWeatherJSONpath);
        });
        // return readData(currentWeatherJSONpath);
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