'use strict';
var config = require('../config/config.js'),
    MongoClient = require('mongodb').MongoClient;
    // Logger = require('../services/logger.js'),
    // logger = new Logger('../logs/log.txt', false);
var logger = require('./../services/logger.js');


module.exports = (function () {

    var getDataFromDB = function (url, collectionName) {
        var result = {};
        MongoClient.connect(url, function (error, db) {
            // console.log(db.getCollection("openWeather"));
            console.log('it works');
            if (error) {
                console.log('error1 works ----------');
                console.log(error);
                console.log('error1 works ----------');
                logger.logError(error);
            }
            var oneCollection = db.collection(collectionName);
            oneCollection.find().toArray(function (err, docs) {
                 if (error) {
                     console.log('error2 works');
                    console.log(error);
                    logger.logError(error);
                    docs = null;
                }
                result = docs;
                db.close();
                console.log('docs start----------------------------------------------');
                console.log(docs[0]);
                console.log('docs finish----------------------------------------------');
            });
        });
        console.log('result start----------------------------------------------');
        console.log(result);
        console.log('result finish----------------------------------------------');
        return result;
    };

    var setDataToDB = function (url, collectionName, data) {
        MongoClient.connect(url, function (error, db) {
            if (error) {
                console.log('Can\'t connect to DB');
                console.log(error);
                logger.logError(error);
            }
            var collection = db.collection(collectionName);
            collection.insertOne(data, function (error, result) {
                if (error) {
                    console.log(url + ' ' + collection);
                    console.log(error);
                    logger.logError(error);
                }
            });
            db.close();
        });
    };

    return {
        getDataFromDB: getDataFromDB,
        setDataToDB: setDataToDB
    }
})();