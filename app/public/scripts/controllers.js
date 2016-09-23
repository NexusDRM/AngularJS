'use strict';


app.controller('headerController', ['$route', function($route) {
    var vm = this;

}]);

app.controller('FooterController', ['$route', function($route) {
    var vm = this;

}]);

app.controller('loginController', ['LoginService', function(LoginService) {
    var vm = this;
    vm.form = {};
    //submit form after validations have been cleared
    vm.login = function() {
        LoginService.login(vm.form);
    };
    vm.register = function() {
        LoginService.register();
    };
}]);

// app.controller('logoutController', ['LogoutService', function(LogoutService){
//   var vm = this;
//   vm.logOut = LogoutService.logOut;
// }]);

app.controller('signupController', ['SignUpService', function(SignUpService) {
    var vm = this;
    vm.form = {};
    vm.signup = function() {
        SignUpService.signup(vm.form);
    };
}]);

app.controller('donateController', ['$location', '$window', 'LogoutService', 'DonateService', 'UserService', function($location, $window, LogoutService, DonateService, UserService) {
    var vm = this;
    if (!$window.localStorage.token) {
        $location.path('/');
    }
    vm.currentUserId = UserService.ParseToken();
    vm.form = {};
    function getToken (){
      DonateService.getClientToken();
      vm.clientToken = $window.localStorage.clientToken;
    }
    getToken();
    // console.log(vm.clientToken);
    vm.currentDate = Date.now();
    vm.maxFutureDate = new Date();
    vm.maxFutureDate.setDate(vm.maxFutureDate.getDate() + 30);
    vm.futureDate = $window.setFutureDate;
    vm.processPayment = function() {
        vm.form.nonce = $window.localStorage.nonce;
        console.log("form data being passed to DS.process", vm.form);
        DonateService.process(vm.form);
    };
    vm.logOut = LogoutService.logOut;
    //if user is not logged in we want them to be so this redirs to login
    //----attempted braintree-angular integration ------
  //   var client;
   //
  //  vm.creditCard = {
  //    number: vm.form.number,
  //    expirationDate: vm.form.expire
  //  };
   //
  //  var startup = function() {
  //    $braintree.getClientToken().success(function(token) {
  //      client = new $braintree.api.Client({
  //        clientToken: token
  //      });
  //    });
  //  };
   //
  //  vm.payButtonClicked = function() {
   //
  //    // - Validate $scope.creditCard
  //    // - Make sure client is ready to use
   //
  //    client.tokenizeCard({
  //      number: vm.creditCard.number,
  //      expirationDate: vm.creditCard.expirationDate
  //    }, function (err, nonce) {
   //
  //      // - Send nonce to your server (e.g. to make a transaction)
   //
  //    });
  //  };
   //
  //  startup();
}]);


app.controller('userController', ['$location', '$window', 'UserService', 'LogoutService', '$http', function($location, $window, UserService, LogoutService, $http) {
    var vm = this;
    vm.updateForm = {};
    vm.updateForm.id = $window.localStorage.id;
    vm.updateForm.updated_at = Date.now();
    var currentUserId = $window.localStorage.id;
    vm.currentUserId = currentUserId;
    UserService.getUserInfo()
        .then(function(response) {
            vm.form = {};
            vm.form.currentUserId = currentUserId;
            vm.form.user = response.data.results;
            vm.newsletterOptIn = vm.form.user.newsletterOptIn;
            vm.title = vm.form.user.title;
            vm.firstName = vm.form.user.firstName;
            vm.lastName = vm.form.user.lastName;
            vm.suffix = vm.form.user.suffix;
            vm.streetAddress = vm.form.user.streetAddress;
            vm.city = vm.form.user.city;
            vm.state = vm.form.user.state;
            vm.postalCode = vm.form.user.postalCode;
            vm.phone = vm.form.user.phone;
        });
    vm.submit = function(data) {
        // console.log("data",data);
        $http.put("http://homestead.app/updateUser", {
                data: data,
            })
            .then(function(response) {
                console.log(response);
                $window.location = 'user';
            });
    };

    vm.logOut = LogoutService.logOut;
    if (!$window.localStorage.token) {
        $window.location = '/';
    }




}]);

app.controller('adminController', ['$location', '$window', 'AdminService', 'UserService', 'LogoutService', '$http', function($location, $window, AdminService, UserService, LogoutService, $http) {
    var vm = this;
    vm.updateForm = {};
    vm.userToModify = {};
    vm.updateForm.id = $window.localStorage.id;
    vm.updateForm.updated_at = Date.now();
    var currentUserId = $window.localStorage.id;
    vm.currentUserId = currentUserId;
    vm.logOut = LogoutService.logOut;
    $http.post("http://homestead.app/getAllUsers", {
            user_id: $window.localStorage.id
        })
        .then(function(response) {
            // console.log(response.data.users);
            vm.users = response.data.users;
        });
    vm.setUser = function(e) {
        console.log(e);
        vm.userToModify = e.currentTarget;

    };
    UserService.getUserInfo(vm.userToModify)
        .then(function(response) {
            vm.form = {};
            vm.form.currentUserId = currentUserId;
            vm.form.user = response.data.results;
            vm.newsletterOptIn = vm.form.user.newsletterOptIn;
            vm.title = vm.form.user.title;
            vm.firstName = vm.form.user.firstName;
            vm.lastName = vm.form.user.lastName;
            vm.suffix = vm.form.user.suffix;
            vm.streetAddress = vm.form.user.streetAddress;
            vm.city = vm.form.user.city;
            vm.state = vm.form.user.state;
            vm.postalCode = vm.form.user.postalCode;
            vm.phone = vm.form.user.phone;
        });
    if (!$window.localStorage.token) {
        $window.location = '/';
    }
}]);
