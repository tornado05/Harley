Harley.controller("formController", ["$scope", function ($scope) {
     $scope.name = " ";
     $scope.lastname = " ";
     $scope.age = " ";
     

 $scope.setAttr = function () {
        console.log("Show data from input - ", $scope.name, $scope.lastname, $scope.age);
      
    };
  

}]);