'use strict';

var http = require('http'), express = require('express');
var bodyParser = require("body-parser");
var app = express();
var logger = require('./services/logger.js');
var weatherController = require('./controllers/weather');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/weather/v01/current', function (req, res) {
    weatherController.getCurrentWeather().then(function (data) {
        res.send(data)
    });
});

//TODO: Make parameters for send day or time interval
app.get('/weather/v01/statistic/day', function (req, res) {
    var date = new Date();
    weatherController.getDaysStatiscticData(date).then(function (data) {
        res.send(data)
    });
});


http.createServer(app).listen(3000, function () {
    console.log('App listening on port 3000!');
});

weatherController.initialize();