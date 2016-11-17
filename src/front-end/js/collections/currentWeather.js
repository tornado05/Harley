var app = app || {};

app.currentWeatherCollection = Backbone.Collection.extend({
    url: '/weather/v01/current',
    model: app.currentWeatherModel
});
