/**
 * Created by andyk on 26.02.2017.
 */
Harley.factory("Configs", ["$resource", function ($resource) {
    return $resource("/weather/v01/configs", {}, {
        'get': {
            method: "GET"
        }
    });
}]);