var request = require('request');
// var Logger = require('logger.js');
// var logger = new Logger('./logs/log.txt', false);
var config = require('../config/config');



module.exports = (function () {

    var getWeatherData = function () {
        var citiesURLs = config.getCitiesURLs();
        var data = [];

        citiesURLs.forEach(function (url) {

            var result = request(url.url, function (error, response, body) {
                if (error) {
                    // logger.logError(error);
                }
                if (!error && response.statusCode === 200) {
                    console.log('*******************************************');
                    console.log(data);
                    data.push(
                        {
                            "weatherData": JSON.parse(body)
                        }
                    );

                }
            });


        });
        
        return data;
    };

    return {
        getWeatherData: getWeatherData
    }
})();

