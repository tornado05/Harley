Harley.controller("HarleyTestComponentController", ["$scope", "$element", "$attrs", function ($scope, $element, $attrs) {
    $scope.setAttr = function () {
        console.log("setAttr", $element, $attrs);
        $element.attr("data-test", "test");
    };

    $scope.getAttr = function () {
        var value = $element.attr("data-test");
        console.log("Data attribute value: ", value);
    };
}]);