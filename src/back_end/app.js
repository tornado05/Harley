'use strict';


var express = require('express');
var bodyParser = require("body-parser");
var logger = require('./services/logger.js');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});