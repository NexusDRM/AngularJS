'use strict';

app.service("SignUpService", ['$http', '$window', function($http, $window){
	var sv = this;
	//TODO: want to implement password checking

	sv.signup = function(form){
		var data = JSON.stringify({
			  email: form.email,
        password: form.password,
				title: form.title || null,
				firstName: form.firstName || null,
				lastName: form.lastName || null,
				suffix: form.suffix || null,
				street_address: form.street || null,
				city: form.city || null,
				state: form.state || null,
				postalCode: form.postalCode || null,
				phone: form.phone || null,
				newsletterOptIn: form.newsletterOptIn || null
      });
			console.log(data);

		$http.post('http://homestead.app/api/auth/signup', data)
			.then(function(response) {
				console.log(response);
        $window.localStorage.token = response.data.token;
        $window.location='donate';
      })
      .catch(function(err) {
				throw new Error(err, 402);
      });
	};

}]);

app.service("LoginService", ['$http', '$window', function($http, $window){
	var sv = this;
	sv.login = function(data){
		$http.post('http://homestead.app/api/auth/login', {
			email: data.email,
			password: data.password
		})
		.then(function(response){
			$window.localStorage.token = response.data.token;
			// $window.localStorage.user_id =
			$window.location='donate';
		})
		.catch(function(err){
			throw new Error(err, 402);
		});
	};
}]);

app.service('LogoutService', ['$window', function($window){
	var sv = this;
	sv.logOut = function(){
		delete($window.localStorage.token);
		$window.location='logged-out';
	};
}]);

app.service('DonateService', ['$window', '$http', function($window, $http){
	var sv = this;
	sv.process = function(data){
		console.log("data passed to service", data);
		$window.location='success';
	  };


	sv.getClientToken = function(){
		// var jwt = $window.localStorage.token;
		$http.get("http://homestead.app/getToken")
		.then(function(response){
			$window.localStorage.clientToken = response.data.clientToken;
			console.log('derp');
		})
		.catch(function(err){
			throw new Error(err, 402);
		});
	};



}]);


app.service('UserService', ['$window','$http', function($window,$http){
	var sv = this;
	sv.currentUser = {};
	sv.getUserInfo = function(){
		$http.get("http://homestead.app/getUser/")
		.then(function(response){
			sv.currentUser = response.data.results;
			console.log(sv.currentUser);
		});
	};

	sv.ParseToken = function(){
		var token = $window.localStorage.token;
		// console.log("token",token);
		var arr = token.split('.');
		// console.log("arr",arr);
		var payload = arr[1];
		// console.log("payload",payload);
		var str = atob(payload);
		// console.log(str);
		var obj = JSON.parse(str);
		// console.log("obj",obj);
		var id = obj["sub"];
		// console.log('id',id);
		return id;
	};
	console.log("sv.currentUser",sv.currentUser);
	sv.submit = function(){

	};
}]);
