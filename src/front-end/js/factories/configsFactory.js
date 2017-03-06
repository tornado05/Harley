Harley.factory("Configs", ["$resource", function ($resource) {
    //Redo this inti http
    return $resource("/weather/v01/configs", {}, {
        'get': {
            method: "GET"
        }
    });
}]);
