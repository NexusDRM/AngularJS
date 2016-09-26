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

app.controller('donateController', ['$document','$location', '$window', 'LogoutService', 'DonateService', 'UserService', function($document,$location, $window, LogoutService, DonateService, UserService) {
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

    // vm.process = function(){
    //   var creditCard = $document.getElementById('credit-card-number');
    //   var cvv = $document.getElementById('cvv');
    //   var expire = $document.getElementById('expiration-date');
    //
    //   $http.post("http://homestead.app/processPayment", {
    //
    //   })
    // };
    vm.logOut = LogoutService.logOut;

    //--------------------Placeholder code for sub feature of Laravel---------------------------
    // console.log(vm.clientToken);
    // vm.currentDate = Date.now();
    // vm.maxFutureDate = new Date();
    // vm.maxFutureDate.setDate(vm.maxFutureDate.getDate() + 30);
    // vm.futureDate = $window.setFutureDate;
    // vm.processPayment = function() {
    //     vm.form.nonce = $window.localStorage.nonce;
    //     console.log("form data being passed to DS.process", vm.form);
    //     DonateService.process(vm.form);
    // };
    //if user is not logged in we want them to be so this redirs to login
    //----attempted braintree-angular integration ------

    // $document.ready(function(){
    //   console.log('ready function');
    //   vm.number = document.getElementById('card-number');
    //   vm.cvv = document.getElementById('cvv');
    //   vm.expiration = document.getElementById('expiration-date');
    //
    // 	vm.number.setAttribute("ng-model", "DC.form.number");
    // 	vm.cvv.setAttribute("ng-model", 'DC.form.cvv');
    // 	vm.expiration.setAttribute("ng-model", "DC.form.expire");
    // });

    // function setAttributes(){
    //
    //   $compile(vm.number, vm.cvv, vm.expiration);
    // }


}]);


app.controller('userController', ['$location', '$window', 'UserService', 'LogoutService', '$http', function($location, $window, UserService, LogoutService, $http) {
    var vm = this;

    //updateForm is filled with creamy goodness and then passed long with vm.submit to update user
    vm.updateForm = {};

    vm.updateForm.id = $window.localStorage.id;
    vm.updateForm.updated_at = Date.now();
    var currentUserId = $window.localStorage.id;
    vm.currentUserId = currentUserId;
    console.log(currentUserId);


    //UserService.getuserinfo is to prepopulate field placeholders with current user info
    UserService.getUserInfo()
        .then(function(response) {
            vm.form = {};
            console.log(vm.form);
            vm.form.currentUserId = currentUserId;
            console.log(currentUserId);
            vm.form.user = response.data.results;
            console.log(vm.form.user);
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
            vm.updateForm.title = vm.form.user.title;
            vm.updateForm.firstName = vm.form.user.firstName;
            vm.updateForm.lastName = vm.form.user.lastName;
            vm.updateForm.suffix = vm.form.user.suffix;
            vm.updateForm.streetAddress = vm.form.user.streetAddress;
            vm.updateForm.city = vm.form.user.city;
            vm.updateForm.state = vm.form.user.state;
            vm.updateForm.postalCode = vm.form.user.postalCode;
            vm.updateForm.phone = vm.form.user.phone;
            vm.updateForm.newsletterOptIn = vm.form.user.newsletterOptIn;
        });

    vm.optIn = function(){
      vm.updateForm.newsletterOptIn = true;
    };

    vm.optOut = function(){
      vm.updateForm.newsletterOptIn = false;
    };

    vm.submit = function() {
      var data = vm.updateForm;
      console.log(data);
        $http.put("http://homestead.app/updateUser", data)
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
        // console.log(e);
        vm.userToModify = e.currentTarget;

    };
    UserService.getUserInfo()
        .then(function(response) {
            vm.form = {};
            vm.form.currentUserId = currentUserId;
            vm.form.user = response.data.results;
            console.log(vm.form.user);
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
            vm.updateForm.title = vm.form.user.title;
            vm.updateForm.firstName = vm.form.user.firstName;
            vm.updateForm.lastName = vm.form.user.lastName;
            vm.updateForm.suffix = vm.form.user.suffix;
            vm.updateForm.streetAddress = vm.form.user.streetAddress;
            vm.updateForm.city = vm.form.user.city;
            vm.updateForm.state = vm.form.user.state;
            vm.updateForm.postalCode = vm.form.user.postalCode;
            vm.updateForm.phone = vm.form.user.phone;
            vm.updateForm.newsletterOptIn = vm.form.user.newsletterOptIn;
        });

    vm.optIn = function(){
      vm.updateForm.newsletterOptIn = true;
    };

    vm.optOut = function(){
      vm.updateForm.newsletterOptIn = false;
    };

    vm.submit = function(){
      var data = vm.updateForm;
      // var user_id = $window.localStorage.id;
      $http.put("http://homestead.app/updateUser", data)
          .then(function(response) {
              console.log(response);
              $window.location = 'admin';
          });
    };

    if (!$window.localStorage.token) {
        $window.location = '/';
    }
}]);
