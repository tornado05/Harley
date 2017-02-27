Harley.controller("selectController", ["$scope", function ($scope) {
    $scope.time = {
        now_morning : "Good morning!",
        now_afternoon: "Good afternoon!",
        now_evening : "Good evening!"
    };

  $scope.setSelect = function () {
         console.log("Show data from select - ", $scope.time); //не знаю як витянуть тільки вибрану позицію :-(
      
     };
  

}]);