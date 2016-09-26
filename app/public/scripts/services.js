'use strict';

app.service("SignUpService", ['$http', '$window','UserService', function($http, $window, UserService){
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
				newsletterOptIn: form.newsletterOptIn || null,
				is_admin: form.is_admin || null
      });
			console.log(data);

		$http.post('http://homestead.app/api/auth/signup', data)
			.then(function(response) {
				console.log(response);
        $window.localStorage.token = response.data.token;
				$window.localStorage.id = UserService.ParseToken(response.data.token);
        $window.location='donate';
      })
      .catch(function(err) {
				throw new Error(err, 402);
      });
	};

}]);

app.service("LoginService", ['$http', '$window','UserService', function($http, $window, UserService){
	var sv = this;
	sv.register = function(){
		$window.location='signup';
	};
	sv.login = function(data){
		console.log(data);
		$http.post('http://homestead.app/login', {
			email: data.email,
			password: data.password
		})
		.then(function(response){
			$window.localStorage.token = response.data.token;
			$window.localStorage.id = UserService.ParseToken(response.data.token);
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
		delete $window.localStorage.token;
		delete $window.localStorage.clientToken;
		$window.location='logged-out';
	};
}]);

app.service('DonateService', ['$window', '$http', function($window, $http){
	var sv = this;
	// sv.process = function(data){
	// 	console.log(data);
	// 	$http.post('http://homestead.app/processPayment',{
	// 		nonce:data
	// 	})
	// 	.then(function(){
	// 		$window.location='success';
	// 	})
	// 	.catch(function(err){
	// 		throw new Error(err);
	// 	});
	// };


	sv.getClientToken = function(){
		// var jwt = $window.localStorage.token;
		$http.get("http://homestead.app/getToken",{
			user_id : $window.localStorage.id
		})
		.then(function(response){
			$window.localStorage.clientToken = response.data.clientToken;
			// console.log('derp');
		})
		.catch(function(err){
			throw new Error(err, 402);
		});
	};


}]);


app.service('UserService', ['$window','$http', function($window,$http){
	var sv = this;

	sv.getUserInfo = function(){
		return $http.post("http://homestead.app/getUser/",{
			user_id : $window.localStorage.id
		});
	};

	sv.ParseToken = function(){
		var token = $window.localStorage.token;
		var arr = token.split('.');
		var payload = arr[1];
		var str = atob(payload);
		var obj = JSON.parse(str);
		var id = obj["sub"];
		return id;
	};

}]);

app.service('AdminService', ['$window', '$http', function($window,$http){
	var sv = this;
	sv.getUserInfo = function(id){
		return $http.post("http://homestead.app/getUser/",{
			user_id : id
		});
	};
}]);
