'use strict';


app.controller('HeaderController', ['$route', function($route){
  var vm = this;

}]);

app.controller('FooterController', ['$route', function($route){
  var vm = this;

}]);

app.controller('loginController', ['LoginService', function(LoginService){
  var vm = this;
  vm.form = {};
  //submit form after validations have been cleared
  vm.submit = function(){
      if(vm.loginForm.$valid){
        LoginService.login(vm.form);
      }
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


// app.controller('donateController', function($http){
//   var vm=this;
//
//   vm.submit = function(){
//     if(vm.donateForm.$valid){
//       //$http post to stripe here
//     }
//   };
// });
