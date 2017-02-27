Harley.factory("Configs", ["$resource", function ($resource) {
    return $resource("/weather/v01/configs", {}, {
        'get': {
            method: "GET"
        }
    });
}]);