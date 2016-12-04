var app = app || {};

Array.max = function( array ){
    return Math.max.apply( Math, array );
};

app.currentWeatherCollection = Backbone.Collection.extend({
    url: '/weather/v01/current',
    
    model: app.currentWeatherModel,

    getCurrentAverageData: function (cities){
        //TODO: take services value from config
        var services = 3; // number of services
        _.each(this.models, function (model){
            _.each(cities, function(city){
               if (model.get('cityName') == city.name){
                   city.temp ? city.temp += model.get('temp'): city.temp = model.get('temp');
                   city.pressure ? city.pressure += model.get('pressure') : city.pressure = model.get('pressure');
                   city.humidity ? city.humidity += model.get('humidity') : city.humidity = model.get('humidity');
                   city.fallOut ? city.fallOut += '-' + model.get('fallOut') : city.fallOut = model.get('fallOut');
               }
            });
        });
        _.each(cities, function(city){
            city.temp = Math.round(city.temp / services);
            city.pressure = Math.round(city.pressure / services);
            city.humidity = Math.round(city.humidity / services);
            city.fallOut = this._formatFallOut(city.fallOut);
        }, this);
        return cities;
    },

    _formatFallOut: function (fallOut){
        var countedData = {};
        _.each(fallOut.split('-'), function (i){
            countedData[i] ? countedData[i]++ : countedData[i] = 1;
        });
        if (_.size(countedData) == 1){
            return _.keys(countedData)[0];
        } else {
            var averageVal = Math.max.apply(Math, _.values(countedData));
            countedData = _.invert(countedData);
            return countedData[averageVal];
        }
    }
});
