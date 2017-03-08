Harley.factory("statisticData", ["$resource", function ($resource) {
    return $resource("/weather/v01/stat/service-by-city/day?from=:periodFrom&to=:periodTo&city=:city", {}, {
        'get': {
            method: "GET",
            isArray: true,
            params:{
                periodFrom: '@periodFrom',
                periodTo: '@periodTo',
                city: '@city'
            }
        }
    });
}]);