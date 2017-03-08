Harley.factory("SignupFactory", ["$resource", function ($resource) {
    return $resource("/signup", {}, {
        'post': {
            method: "post"
        }
    });
}]);