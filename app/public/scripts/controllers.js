'use strict';


app.controller('HeaderController', ['$route', function($route){
  var vm = this;

}]);

app.controller('FooterController', ['$route', function($route){
  var vm = this;

}]);

app.controller('loginController', ['LoginService', function(LoginService){
  var vm = this;
  // vm.pwchecked = function(pwcheck){
  //
  // };
  //vm.pwcheck = LoginService.check;
  //submit form after validations have been cleared
  vm.submit = function(){
    //compare pw fields
      if(vm.loginForm.$valid){
        LoginService.login();
      }
  };
}]);

app.controller('signupController', ['SignUpService', function(SignUpService){
  var vm=this;
  vm.form = {};
  vm.signup = SignUpService.signup;
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
