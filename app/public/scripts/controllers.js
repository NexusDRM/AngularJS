'use strict';


app.controller('headerController', ['$route', function($route){
  var vm = this;

}]);

app.controller('FooterController', ['$route', function($route){
  var vm = this;

}]);

app.controller('loginController', ['LoginService', function(LoginService){
  var vm = this;
  vm.form = {};
  //submit form after validations have been cleared
  vm.login = function(){
        LoginService.login(vm.form);
  };
}]);

app.controller('logoutController', ['LogoutService', function(LogoutService){
  var vm = this;
  vm.logOut = LogoutService.logOut;
}]);

app.controller('signupController', ['SignUpService', function(SignUpService){
  var vm=this;
  vm.form = {};
  vm.signup = function(){
    SignUpService.signup(vm.form);
  };
}]);

app.controller('donateController', ['$location','$window','LogoutService', function($location, $window, LogoutService){
  var vm = this;
  vm.form = {};
  vm.currentDate = Date.now();
  console.log(vm.currentDate);
  vm.maxFutureDate = new Date();
  vm.maxFutureDate.setDate(vm.maxFutureDate.getDate() + 30);
  console.log(vm.maxFutureDate);
  vm.futureDate = $window.setFutureDate;
  console.log(vm.futureDate);
  // vm.setFutureDate = function($window){
  //   futureDate = $window.setNewDate;
  // }
  // vm.getCurrentDateTime = vm.currentDate.setDate();
  // vm.setMaxFutureDate = vm.futureDate.setDate(30);
  vm.logOut = LogoutService.logOut;
  //if user is not logged in we want them to be so this redirs to login
  if(!$window.localStorage.token){
    $location.path('/');
  }
}]);
