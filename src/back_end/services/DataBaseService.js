'use strict';
var config = require('../config/config.js'),
    MongoClient = require('mongodb').MongoClient,
    Logger = require('../services/logger.js'),
    logger = new Logger('../logs/log.txt', false);


module.exports = (function () {
    var isData = false;

    // var getDataFromDB = function (url, collectionName) {
    //
    //     return new Promise(function(resolve, reject) {
    //         MongoClient.connect(url, function (error, db) {
    //             if (error) {
    //                 reject(error);
    //             } else {
    //                 resolve(db);
    //             }
    //         }).then(function (db) {
    //             return new Promise(function (resolve, reject) {
    //                 var collection = db.collection(collectionName);
    //                 collection.find().toArray(function (err, items) {
    //                     if (err) {
    //                         reject(err);
    //                     } else {
    //                         console.log(items);
    //                         resolve(items);
    //                     }
    //                 });
    //             });
    //         });
    //     });
    //
    // };

    var getDataFromDB = function (url, collectionName) {
        return MongoClient.connect(url).then(function(db) {
            var collection = db.collection(collectionName);
            return collection.find().toArray();
        }).then(function(items) {            
            return items;
        });
    };

    var setDataToDB = function (url, collectionName, data) {
        MongoClient.connect(url, function (error, db) {
            if (error) {
                console.log('Can\'t connect to DB');
                console.log(error);
                // logger.logError(error);
            }
            var collection = db.collection(collectionName);
            collection.insertOne(data, function (error, result) {
                if (error) {
                    console.log(url + ' ' + collection);
                    console.log(error);
                    // logger.logError(error);
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