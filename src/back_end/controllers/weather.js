// var Logger = require('../services/logger.js');
// var logger = new Logger('./logs/log.txt', false);


var getWeatherFromAPI = require('../services/getDataFromAPI');

module.exports = (function () {

    // var totalConfig = config.getTotalConfig();

    var writeData = function (data, path) {
        try {
            fs.writeFileSync(
                path,
                JSON.stringify(data),
                { flag: 'w+' }
            );
        } catch(e) {
            // logger.logError('Failed saving data to file, data: ' +
                JSON.stringify(data);
            return false;
        }
        return true;
    };

    var dataPath = '../config/data.json';


    var initialize = function () {
        setInterval(function () {
            var data = getWeatherFromAPI.getWeatherData();
            console.log(data);
            writeData(data, dataPath);
        }, 5000);
    };

    return {
        initialize: initialize
    }
})();