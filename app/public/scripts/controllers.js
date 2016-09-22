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
  vm.clientToken = DonateService.getClientToken();
  vm.currentDate = Date.now();
  vm.maxFutureDate = new Date();
  vm.maxFutureDate.setDate(vm.maxFutureDate.getDate() + 30);
  vm.futureDate = $window.setFutureDate;
  vm.processPayment = function(){
    console.log("form data being passed to DS.process", vm.form);
    DonateService.process(vm.form);
  };
  vm.logOut = LogoutService.logOut;
  //if user is not logged in we want them to be so this redirs to login
  if(!$window.localStorage.token){
    $location.path('/');
  }
}]);
//
// app.controller('adminController', ['$location', '$window','AdminService','UserService', function($location, $window, AdminService, UserService){
//   var vm = this;
//   vm.currentUserId = UserService.ParseToken;
//   console.log(vm.currentUserId);
//   vm.form = {};
//   vm.updated_at = Date.now();
//   // vm.userId = UserService.getId;
//   // vm.currentOptions = function(){
//   //   return AdminService.getUserInfo(vm.userId);
//   // };
//   vm.currentOptions = AdminService.getUserInfo;
//   console.log(vm.currentOptions);
//   // vm.title = vm.currentOptions.title;
//   // vm.firstName = vm.currentOptions.firstName;
//   // vm.lastName = vm.currentOptions.lastName;
//   // vm.suffix = vm.currentOptions.suffix;
//   // vm.streetAddress = vm.currentOptions.streetAddress;
//   // vm.city = vm.currentOptions.city;
//   // vm.state = vm.currentOptions.state;
//   // vm.postalCode = vm.currentOptions.postalCode;
//   // vm.phone = vm.currentOptions.phone;
//   // vm.newsletterOptIn = vm.currentOptions.newsletterOptIn;
//   // vm.isAdmin = vm.currentOptions.is_admin;
//   // vm.submit = function(){
//   //   UserService.updateUser(vm.form);
//   // };
// }]);

app.controller('userController', ['$location','$window','UserService', function($location,$window,UserService){
  var vm = this;
  var vm = this;
  vm.currentUserId = UserService.ParseToken();
  console.log("vm.currentUserId",vm.currentUserId);
  vm.form = {};
  vm.updated_at = Date.now();
  // vm.userId = UserService.getId;
  // vm.currentOptions = function(){
  //   return AdminService.getUserInfo(vm.userId);
  // };
  vm.currentOptions = UserService.getUserInfo();
  console.log("vm.currentOptions",vm.currentOptions);
  // vm.title = vm.currentOptions.title;
  // vm.firstName = vm.currentOptions.firstName;
  // vm.lastName = vm.currentOptions.lastName;
  // vm.suffix = vm.currentOptions.suffix;
  // vm.streetAddress = vm.currentOptions.streetAddress;
  // vm.city = vm.currentOptions.city;
  // vm.state = vm.currentOptions.state;
  // vm.postalCode = vm.currentOptions.postalCode;
  // vm.phone = vm.currentOptions.phone;
  // vm.newsletterOptIn = vm.currentOptions.newsletterOptIn;
  // vm.isAdmin = vm.currentOptions.is_admin;
  // vm.submit = function(){
  //   UserService.updateUser(vm.form);
  // };
}]);
