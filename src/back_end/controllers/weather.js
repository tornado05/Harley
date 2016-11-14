'use strict';
var Logger = require('../services/logger');
var logger = new Logger('../logs/log.txt', false);
var getWeatherFromAPI = require('../services/getDataFromAPI');
var serviceDB = require ('../services/DataBaseService');
var mapperService = require('../services/mapperService');

module.exports = (function () {

    var data = [],
        getDataOnlyOnce = false;

    var initialize = function () {
        if (!getDataOnlyOnce) {
            data = getWeatherFromAPI.getWeatherData();
            getDataOnlyOnce = true;
        }
        // getAllDataFromBD();

    };

    //код Лиды

    // var getAllDataFromBD = function () {
    //     var openWeatherData = serviceDB.getDataFromDB("openWeather");
    //     return openWeatherData;
    // };

    return {
        initialize: initialize, 
    }
})();