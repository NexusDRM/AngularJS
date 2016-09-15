'use strict';


app.controller('HeaderController', ['$route', function($route){
  var vm = this;

}]);

app.controller('FooterController', ['$route', function($route){
  var vm = this;

}]);

app.controller('loginController', function($http){
  var vm = this;
  vm.pwchecked = function(pwcheck){

  };
  vm.pwcheck = PasswordService.check;
  //submit form after validations have been cleared
  vm.submit = function(){
    //compare pw fields
    if(vm.pwchecked){
      if(vm.loginForm.$valid){
        LoginService.login();
      }
    }

  };
});

app.controller('signupController', function($http){
  var vm=this;
  vm.form = {};
});

app.controller('donateController', function($http){
  var vm=this;

  vm.submit = function(){
    if(vm.donateForm.$valid){
      //$http post to stripe here
    }
  };
});
