const Login = Login || {};

Login.init = function(){
  this.apiUrl = 'http://localhost:3000/api';
  this.$main = $('main');
};

$(Login.init.bind(Login));
