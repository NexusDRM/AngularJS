'use strict';

var app = angular.module('nexusDRM', ['ngRoute']);

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('index', {
			url:'/',
			templateUrl: './public/views/index.html',
			controller: 'indexController as IC'
		})
		.state('login', {
			url: '/login',
			templateUrl: './public/views/index.html',
			controller: 'loginController as LC'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: './public/views/signup.html',
			controller: 'signupController as SC'
		})
		.state('donate', {
			url: '/donate',
			templateUrl: './public/views/donate.html',
			controller: 'donateController as DC'
		});
		$urlRouterProvider.otherwise('/');
		app.config(['$httpProvider', function($httpProvider){
		  $httpProvider.interceptors.push('authInterceptor');
		}]);
})
