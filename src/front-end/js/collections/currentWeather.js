var app = app || {};

app.currentWeatherCollection = Backbone.Collection.extend({
    url: '/weather/v01/current',
    
    model: app.currentWeatherModel,
    
    getAllServices: function() {
        var services = [];
        _.each(this.models, function (model) {
            services.push(model.get('sourceAPI'));
        });
        return _.uniq(services).length;
    },
    
    getWeatherByParams: function (city, param){
        var result = {
            labels:[],
            data:[]
        };
        _.each(this.models, function (model){
            if (model.get('cityName') == city){
                result.labels.push(model.get('sourceAPI'));
                result.data.push(model.get(param));
            }
        });
        return result;
    }
});
