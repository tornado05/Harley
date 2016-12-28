'use strict';
var config = require('./ConfigService.js'),
    MongoClient = require('mongodb').MongoClient,
    logger = require('./logger.js');

module.exports = (function () {
    var getLastRecords = function (url, collectionName) {
            return MongoClient.connect(url).then(function (db) {
                var collection = db.collection(collectionName);
                return {
                    data: collection.find().sort({$natural: -1}).limit(9).toArray(),
                    db : db
                };
            }).then(function (items) {
                items.db.close();
                return items.data;
            });
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

        getServiceStatisticsByCities = function (url, collectionName, start, end, cityName, serviceName) {
            return MongoClient.connect(url).then(function (db) {
                var collection = db.collection(collectionName);
                return {
                    data: collection.find({$and: [{'date': {$gt: start}}, {'date': {$lt: end}},  {'cityName' : cityName}, {'sourceAPI' : serviceName}]}).toArray(),
                    db: db
                };
            }).then(function (items) {
                items.db.close();
                return items.data;
            });
        },

        getDayStatistics = function (url, collectionName, start, end) {
            return MongoClient.connect(url).then(function (db) {
                var collection = db.collection(collectionName);
                return {
                    data: collection.find({$and: [{'date': {$gt: start}}, {'date': {$lt: end}}]}).toArray(),
                    db: db
                };
            }).then(function (items) {
                items.db.close();
                return items.data;
            });
        },
        getStatisticsOnServices = function (url, collectionName, start, end, service) {
            return MongoClient.connect(url).then(function (db) {
                var collection = db.collection(collectionName);
                return {
                    data: collection.find({$and: [{'date': {$gt: start}}, {'date': {$lt: end}},  {'sourceAPI' : service}]}).toArray(),
                    db: db
                };
            }).then(function (items) {
                items.db.close();
                return items.data;
            });
        },

        getStatisticsOnCities = function (url, collectionName, start, end, cityName) {
            return MongoClient.connect(url).then(function (db) {
                var collection = db.collection(collectionName);
                return {
                    data: collection.find({$and: [{'date': {$gt: start}}, {'date': {$lt: end}},  {'cityName' : cityName}]}).toArray(),
                    db: db
                };
            }).then(function (items) {
                items.db.close();
                return items.data;
            });
        },

        getAllStatistic = function (url, collectionName) {
            return MongoClient.connect(url).then(function (db) {
                var collection = db.collection(collectionName);
                return {
                    data: collection.find({}).toArray(),
                    db: db
                };
            }).then(function (items) {
                items.db.close();
                return items.data;
            });
        };

    return {
        getLastRecords: getLastRecords,
        setDataToDB: setDataToDB,
        getDayStatistics: getDayStatistics,
        getStatisticsOnServices: getStatisticsOnServices,
        getStatisticsOnCities: getStatisticsOnCities,
        getAllStatistic: getAllStatistic,
        getServiceStatisticsByCities: getServiceStatisticsByCities
    };
}());