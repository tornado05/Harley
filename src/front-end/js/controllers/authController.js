Harley.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignUpCtrl'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            resolve: {
                logincheck: checkLoggedin
            }
        })
        .otherwise({
            redirectTo: '/home'
        })
});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user) {
        $rootScope.errorMessage = null;
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        } else {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });
    return deferred.promise;
};

Harley.controller("NavCtrl", ["$scope", "$rootScope", "$location", "$http", function($rootScope, $scope, $http, $location) {
    $scope.logout = function() {
        $http.post("/logout")
            .success(function() {
                $rootScope.currentUser = null;
                $location.url("/home");
            });
    }
}]);

Harley.controller("SignUpCtrl", ["$scope", "$rootScope", "$location", "$http", "SignupFactory", function($scope, $http, $rootScope, $location, SignupFactory) {
    $scope.signup = function(user) {
        // TODO: notify if user passwords are not the same
        if (user.password == user.password2) {
            SignupFactory.post(user).$promise.then(function (data) {
                console.log("Signup data ", data, data.auth);
                $rootScope.currentUser = user;
            }, function (error) {
                console.log("Signup error ", error);
            });
        }
    }
}]);


Harley.controller("LoginCtrl", ["$scope", "$rootScope", "$location", "$http", "LoginFactory", function($location, $scope, $http, $rootScope, LoginFactory) {
    $scope.login = function (user) {
        console.log("LoginCtrl", user);
        LoginFactory.post(user);
    };
}]);