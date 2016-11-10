'use strict';
var Logger = require('../services/logger.js');
var logger = new Logger('../logs/log.txt', false);
var getWeatherFromAPI = require('../services/getDataFromAPI');
var serviceDB = require ('../services/DataBaseService');

module.exports = (function () {

    var data = [],
        getDataOnlyOnce = false;

    var initialize = function () {
        if (!getDataOnlyOnce) {
            data = getWeatherFromAPI.getWeatherData();
            getDataOnlyOnce = true;
            console.log(data);
        }
    };

    return {
        initialize: initialize
    }
})();