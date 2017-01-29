/*jslint unparam: true*/
'use strict';
var http            = require('http'),
    express         = require('express'),
    bodyParser      = require("body-parser"),
    passport    = require('passport'),
    session = require('express-session'),
    app             = express(),
    logger          = require('./services/logger'),
    configService   = require('./services/ConfigService'),
    user          = require('./services/userService'),
    weatherController = require('./controllers/weather');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// route to mock data with services statistics per day
app.get('/weather/v01/stat/service/day', function (req, res) {
    weatherController.getServiceDayStat(req.query.from, req.query.to, req.query.service).then(function (data) {
        res.send(data);
    });
});
// route to mock data with services statistics per month
app.get('/weather/v01/stat/service/month', function (req, res) {
    weatherController.getServiceMonthStat(req.query.from, req.query.service).then(function (data) {
        res.send(data);
    });
});
// route to mock data with cities statistics per day
app.get('/weather/v01/stat/city/day', function (req, res) {
    weatherController.getCityDayStat(req.query.from, req.query.to, req.query.city).then(function (data) {
        res.send(data);
    });
});
// route to mock data with cities statistics per month
app.get('/weather/v01/stat/city/month', function (req, res) {
    weatherController.getCityMonthStat(req.query.from, req.query.city).then(function (data) {
        res.send(data);
    });
});
app.get('/weather/v01/current', function (req, res) {
    weatherController.getCurrentWeather().then(function (data) {
        res.send(data);
    });
});
app.get('/weather/v01/stat/service-by-city/day', function (req, res) {
    weatherController.getServiceStatByCities(req.query.from, req.query.to, req.query.city).then(function (data) {
        res.send(data);
    });
});

app.get('/weather/v01/statistic/day', function (req, res) {
    weatherController.getServiceDayStat(req.query.from, req.query.to).then(function (data) {
        res.send(data);
    });
});

app.get('/weather/v01/settings', function (req, res) {
    res.send(configService.getSettings());
});

app.get('/weather/v01/configs', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(configService.getTotalConfig());
});

app.post('/login', user.login);
app.post('/register', user.register);
app.get('/logout', user.logout);


app.get('/users', function (req, res) {
    res.send('hello ' + req.session.passport.user.username);
});

http.createServer(app).listen(3000, function () {
    console.log('App listening on port 3000!');
});