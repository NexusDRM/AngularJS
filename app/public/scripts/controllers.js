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

app.controller('donateController', ['$location','$window','LogoutService', 'DonateService', function($location, $window, LogoutService, DonateService){
  var vm = this;
  vm.form = {};
  vm.currentDate = Date.now();
  vm.maxFutureDate = new Date();
  vm.maxFutureDate.setDate(vm.maxFutureDate.getDate() + 30);
  vm.futureDate = $window.setFutureDate;
  vm.processPayment = DonateService.process(vm.form);
  vm.logOut = LogoutService.logOut;
  //if user is not logged in we want them to be so this redirs to login
  if(!$window.localStorage.token){
    $location.path('/');
  }
}]);
