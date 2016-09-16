'use strict';

var app = angular.module('nexusDRM', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html',
			controller: 'loginController as LC'
		})
		.when('/signup', {
			templateUrl: 'partials/signup.html',
			controller: 'signupController as SC'
		})
		.when('/donate', {
			templateUrl: 'partials/donate.html',
			controller: 'donateController as DC'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

app.config(["$locationProvider",
    function($locationProvider) {
        $locationProvider.html5Mode(true);
    }
]);

app.config(['$httpProvider', function($httpProvider){
	$httpProvider.interceptors.push('authInterceptor');
}]);
