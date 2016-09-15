'use strict';

app.service("PasswordService", ['$http', '$window', '$route', function($http, $window, $route){
	var sv = this;
	sv.check = function(password, password_confirm){
		if(password === password_confirm){
			return true;
		} else {
			return false;
		}
	};
	sv.signup = function(email, password, prefix, name, street, state, zip, phone){
		$http.post('', {
			  email: email,
        password: password,
				prefix: prefix,
				name: name,
				street_address: street,
				state: state,
				zip: zip,
				phone_number: phone
      })
			.then(function(response) {
        $window.localStorage.token = response.data.token;
        $route.go('/donate');
      })
      .catch(function(err) {
				throw new Error(err, 402);
      });
	};
}]);

app.service("LoginService", ['$http', '$window', '$route', function($http, $window, $route){
	var sv = this;
	sv.login = function(email, password){
		$http.post('homestead.app/login', {
			email: email,
			password: password
		})
		.then(function(response){
			$window.localStorage.token = response.data.token;
			$route.go('/donate');
		})
		.catch(function(err){
			throw new Error(err, 402);
		});
	};
}]);
