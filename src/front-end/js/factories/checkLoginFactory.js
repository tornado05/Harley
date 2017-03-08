Harley.factory("checkLogin", ["$resource", function ($resource) {
    return $resource("/loggedin", {}, {
        'get': {
            method: "GET"
        }
    });
}]);