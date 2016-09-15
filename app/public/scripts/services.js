'use strict';

app.service("SignUpService", ['$http', '$window', '$route', function($http, $window, $route){
	var sv = this;
	//TODO: want to implement password checking
	// sv.check = function(password, password_confirm){
	// 	if(password === password_confirm){
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// };
	sv.signup = function(email, password, title, firstName, lastName, suffix, street, city, state, postalCode, phone, newsletterOptIn){
		$http.post('homestead.app/api/auth/signup', {
			  email: email,
        password: password,
				title: title,
				firstName: firstName,
				lastName: lastName,
				suffix: suffix,
				street_address: street,
				city: city,
				state: state,
				postalCode: postalCode,
				phone: phone,
				newsletterOptIn: newsletterOptIn
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
