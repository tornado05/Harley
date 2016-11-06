var request = require('request');
var Logger = require('logger.js');
var url = require('config.js');
var logger = new Logger('./logs/log.txt', false);

module.exports = (function () {
   var result = request(url, function (error, response, body) {
        if (error) {
            logger.logError(error);
        }
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body));

        }
    });
    return {
        result: result
    }
})();

