'use strict';

var http = require('http'), express = require('express');
var bodyParser = require("body-parser");
var app = express();
var logger = require('./services/logger.js');
var weather = require('./controllers/weather');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));


http.createServer(app).listen(3000, function () {
    console.log('App listening on port 3000!');
});