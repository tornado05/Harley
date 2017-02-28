Harley.service("WeatherService", [ function () {

    this.getDataByService = function (data, name){
        var result = [];
        _.each(data, function (item){
            if (item.sourceAPI === name){
                result.push(item);
            }
        });
        return result;
    };

    this.getWeatherServices = function (data){
        var result = [];
        _.each(data, function (item){
            result.push(item.sourceAPI);
        });
        return _.unique(result);
    }
}]);