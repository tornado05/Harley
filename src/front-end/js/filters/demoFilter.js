Harley.filter("demoFilter", [function () {
    return function (data, someData) {
        return data + " " + someData;
    }
}]);
