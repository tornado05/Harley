'use strict';
var config = require('../config/config'),
    MongoClient = require('mongodb').MongoClient,
    urlDB = 'mongodb://localhost:27017/weatherProject',
    Logger = require('../services/logger.js'),
    logger = new Logger('../logs/log.txt', false);


module.exports = (function () {
    
    var getDataFromDB = function (collection, query) {
        MongoClient.connect(urlDB, function (error, db) {
            if (error) {
                logger.logError(error);
            }
            var collection = db.collection(collection);

            console.log(collection.query.toArray(function (err, docs) {
                if (err) {
                    logger.logError(error);
                    docs = null;
                }
                res.send(docs);
            }));
            db.close();
        });
    };

    return {
        getDataFromDB: getDataFromDB
    }
})();