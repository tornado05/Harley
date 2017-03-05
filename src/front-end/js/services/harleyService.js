Harley.service("HarleyService", ["CONST", function (CONST) {
    var innerFuction = function () {
        return CONST;
    };

    this.getTestValue = function () {
        return innerFuction();
    };
}]);
