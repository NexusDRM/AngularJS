(function(){
	'use strict';

	angular.module('nexusDRM', ['ngRoute','ngResource'])
		.config(['$locationProvider','$routeProvider', nexusDRMconfig]);
		
}());
