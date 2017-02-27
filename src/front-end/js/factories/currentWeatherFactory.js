Harley.factory("CurrentWeather", ["$resource", function ($resource) {
    return $resource("/weather/v01/current", {}, {
        'get': {
            method: "GET"
        }
    });
}]);