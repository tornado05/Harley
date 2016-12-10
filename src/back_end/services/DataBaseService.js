'use strict';
var config = require('./../services/ConfigService.js'),
    MongoClient = require('mongodb').MongoClient,
    logger = require('./../services/logger.js');

module.exports = (function () {
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
        },

        setDataToDB = function (url, collectionName, data) {
            MongoClient.connect(url, function (error, db) {
                if (error) {

                    logger.logError(error);
                }
                var collection = db.collection(collectionName);
                collection.insertOne(data, function (error) {
                    if (error) {
                        logger.logError(error);
                    }
                });
                db.close();
            });
        },

        getDayStatistics = function (url, collectionName, start, end) {
            return MongoClient.connect(url).then(function (db) {
                var collection = db.collection(collectionName);
                return collection.find({$and: [{'date': {$gt: start}}, {'date': {$lt: end}}]}).toArray();
            }).then(function (items) {
                return items;
            });
        },
        getStatisticsOnServices = function (url, collectionName, start, end, service) {
            return MongoClient.connect(url).then(function (db) {
                var collection = db.collection(collectionName);
                return collection.find({$and: [{'date': {$gt: start}}, {'date': {$lt: end}},  {'sourceAPI' : service}]}).toArray();
            }).then(function (items) {
                return items;
            });
        },

        getStatisticsOnCities = function (url, collectionName, start, end, cityName) {
            return MongoClient.connect(url).then(function (db) {
                var collection = db.collection(collectionName);
                return collection.find({$and: [{'date': {$gt: start}}, {'date': {$lt: end}},  {'cityName' : cityName}]}).toArray();
            }).then(function (items) {
                return items;
            });
        },

        getAllStatistic = function (url, collectionName) {
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
        getStatisticsOnCities: getStatisticsOnCities,
        getAllStatistic: getAllStatistic
    };
}());