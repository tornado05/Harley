var app = app || {};


app.statisticWeatherCollection = Backbone.Collection.extend({
    url: '/weather/v01/stat/service-by-city/day',

    model: app.statisticWeatherModel,

    getModelsByCity: function (city) {
        var result = [];
        _.each(this.models, function(model){
            if (model.get('city') == city){
                result.push(model);
            }    
        });
        return result;
    }


});
