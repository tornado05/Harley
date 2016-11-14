'use strict';
var config = require('../config/config.js'),
    MongoClient = require('mongodb').MongoClient,
    urlDB = 'mongodb://localhost:27017/weatherProject',
    Logger = require('../services/logger.js'),
    logger = new Logger('../logs/log.txt', false);


module.exports = (function () {
    
    var getDataFromDB = function (collection) {
        MongoClient.connect(urlDB, function (error, db) {
            // console.log(db.getCollection("openWeather"));
            if (error) {
                logger.logError(error);
            }

            var oneCollection = db.collection(collection);

            var result = [];
            
            oneCollection.find().toArray(function (err, docs) {
                if (err) {
                    logger.logError(error);
                    docs = null;
                }
                db.close();
                console.log(docs);
            }); 


        });
    };

    return {
        getDataFromDB: getDataFromDB
    }
})();