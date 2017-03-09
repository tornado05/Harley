Harley.factory("LoginFactory", ["$resource", function ($resource) {
    return $resource("/login", {}, {
        'post': {
            method: "post"
        }
    });
}]);