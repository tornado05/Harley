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
Harley.factory("LoginFactory", ["$resource", function ($resource) {
    return $resource("/login", {}, {
        'post': {
            method: "post"
        }
    });
}]);

Harley.factory("SignupFactory", ["$resource", function ($resource) {
    return $resource("/signup", {}, {
        'post': {
            method: "post"
        }
    });
}]);