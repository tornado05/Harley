var app = app || {};



app.statisticWeatherCollection = Backbone.Collection.extend({
    url: '/weather/v01/statistic/day',

    model: app.statisticWeatherModel

});
