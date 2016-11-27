'use strict';
var config = require('../config/config.js'),
    MongoClient = require('mongodb').MongoClient,
    logger = require('./../services/logger.js');

module.exports = (function () {
    var isData = false;
    var getLastRecords = function (url, collectionName) {
        return MongoClient.connect(url).then(function (db) {
            var collection = db.collection(collectionName);
            return collection.find().sort({$natural: -1}).limit(9).toArray();
        }).then(function (items) {
            return items;
        });

        /*
         * TODO: need to close connections !!! important;
         * finally(function() {
         db.close();
         });
         * */
    };

    var setDataToDB = function (url, collectionName, data) {
        //logger works 1
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

    var getDayStatistics = function (url, collectionName, start, end) {
        return MongoClient.connect(url).then(function (db) {
            var collection = db.collection(collectionName);
            return collection.find({$and: [{'date': {$gt: start}}, {'date': {$lt: end}}]}).toArray();
        }).then(function (items) {
            return items;
        });
    };
    
    var getStatisticsOnServices = function (url, collectionName, start, end, service) {
        return MongoClient.connect(url).then(function (db) {
            var collection = db.collection(collectionName);
            return collection.find({$and: [{'date': {$gt: start}}, {'date': {$lt: end}},  {'sourceAPI' : service}]}).toArray();
        }).then(function (items) {
            return items;
        });
    };


    var getAllStatistic = function (url, collectionName) {
        return MongoClient.connect(url).then(function (db) {
            var collection = db.collection(collectionName);
            return collection.find({}).toArray();
        }).then(function (items) {
            return items;
        });
    };

    return {
        getLastRecords: getLastRecords,
        setDataToDB: setDataToDB,
        getDayStatistics: getDayStatistics,
        getStatisticsOnServices: getStatisticsOnServices,
        getAllStatistic: getAllStatistic
    }
})();