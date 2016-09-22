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
		//console.log($braintree.tokenizeCard(data));
	  };
	// sv.getToken = function(){
	//
	// };

	sv.getClientToken = function(){
		// var jwt = $window.localStorage.token;
		$http.post("http://homestead.app/getToken")
		.then(function(response){
			$window.localStorage.clientToken = response.data.clientToken;
			console.log('derp');
		})
		.catch(function(err){
			throw new Error(err, 402);
		});
	};



		// client.tokenizeCard({
		// 	number: data.cardNumber,
		// 	expirationDate: data.expirationDate,
		// 	cvv: data.cvv,
		// 	zip: data.zip
		// }, function(err, nonce){
		// 	//http post to server
		// 	$http.post('http://homestead.app/api/process')
		// 	.then(function(response){
		// 		console.log(response);
		// 		$window.location="success";
		// 	})
		// 	.catch(function(err){
		// 		throw new Error(err);
		// 	});
		// });

		//startup();
	//};


}]);
