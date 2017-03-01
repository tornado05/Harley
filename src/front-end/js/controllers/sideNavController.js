Harley.controller("sideNavController", ["$scope",  function ($scope) {
    $scope.status = 'closed';

    $scope.toggleSideNav = function () {
        return $scope.status = $scope.status == 'closed' ? 'opened' : 'closed';
    }
}]);
