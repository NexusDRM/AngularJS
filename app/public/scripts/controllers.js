'use strict';


app.controller('HeaderController', ['$route', function($route){
  var vm = this;

}]);

app.controller('FooterController', ['$route', function($route){
  var vm = this;

}]);

app.controller('loginController', function($http){
  var vm = this;
  //submit form after validations have been cleared
  vm.submit = function(){
    //recheck isValid
    if(vm.loginForm.$valid){
      //$http post to server here
    }
  };
});

app.controller('signupController', function($http){
  var vm=this;

  vm.submit = function(){
    if(vm.signupForm.$valid){
      //$http post to server here
    }
  };
});

app.controller('donateController', function($http){
  var vm=this;

  vm.submit = function(){
    if(vm.donateForm.$valid){
      //$http post to stripe here
    }
  };
});
