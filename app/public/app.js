'use strict';

var app = angular.module('nexusDRM', ['ngRoute']);

app.constant("routeToApi", {
	"url": "https://mysterious-dusk-96055.herokuapp.com"
});

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
		.when('/logged-out', {
			templateUrl: 'partials/loggedout.html'
		})
		.when('/user', {
			templateUrl: 'partials/user.html',
			controller: 'userController as UC'
		})
		.when('/success', {
			templateUrl: 'partials/success.html',
			controller: 'userController as UC'
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
