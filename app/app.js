'use strict';
console.log("ng-fuck");

var app = angular.module('nexusDRM', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when("/", {
			templateUrl: './public/index.html',
			controller: 'indexController as IC'
		})
		.when('/login', {
			templateUrl: './public/partials/login.html',
			controller: 'loginController as LC'
		})
		.when('/signup', {
			templateUrl: './public/partials/signup.html',
			controller: 'signupController as SC'
		})
		.when('/donate', {
			templateUrl: './public/partials/donate.html',
			controller: 'donateController as DC'
		})
		.otherwise({
			redirectTo: '/'
		});
		// app.config(['$httpProvider', function($httpProvider){
		//   $httpProvider.interceptors.push('authInterceptor');
		// }]);
}]);
