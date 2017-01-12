var weatherDataService = (function () {
    
    var getAverageParams = function (collection, cities) {
        var services = collection.getAllServices();
        _.each(collection.models, function (model) {
            //TODO: move this into another function
            _.each(cities, function (city) {
                if (model.get('cityName') == city.name) {
                    city.temp ? city.temp += model.get('temp') : city.temp = model.get('temp');
                    city.pressure ? city.pressure += model.get('pressure') : city.pressure = model.get('pressure');
                    city.humidity ? city.humidity += model.get('humidity') : city.humidity = model.get('humidity');
                    city.fallOut ? city.fallOut += '-' + model.get('fallOut') : city.fallOut = model.get('fallOut');
                }
            });
        });
        _.each(cities, function (city) {
            city.temp = Math.round(city.temp / services);
            city.pressure = Math.round(city.pressure / services);
            city.humidity = Math.round(city.humidity / services);
            city.fallOut = _formatFallOut(city.fallOut);
        }, this);
        return cities;
    };

    var _formatFallOut = function (fallOut) {
        var countedData = {};
        var strFallOut = new String(fallOut);

        _.each(strFallOut.split('-'), function (i) {
            if (_.isNumber(countedData[i])) {
                countedData[i]++
            } else {
                countedData[i] = 1;
            }
        });

        if (_.size(countedData) == 1) {
            return _.keys(countedData)[0];
        } else {
            var averageVal = Math.max.apply(Math, _.values(countedData));
            countedData = _.invert(countedData);
            return countedData[averageVal];
        }
    };

    return {
        getAverageParams: getAverageParams
    }
})();