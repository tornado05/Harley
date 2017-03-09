Harley.service("CheckLoggedInService", [ function () {
    this.checkLoggedIn = function($q, $timeout, $rootScope, checkLogin) {
        var deferred = $q.defer();
        checkLogin.get({}).$promise.then(function (user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        }, function (error) {
            console.log("error checkLoggedin", error);
        });
        return deferred.promise;
    };
}]);