const Login = Login || {};

Login.init = function(){
  this.apiUrl = 'http://localhost:3000/api';
  this.$main = $('main');
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  this.$main.on('submit', 'form', this.handleForm);

  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

Login.loggedInState = function(){
  $('.loggedIn').show();
  $('.loggedOut').hide();
};

Login.loggedOutState = function(){
  $('.loggedIn').hide();
  $('.loggedOut').show();
};

Login.register = function(e) {
  if (e) e.preventDefault();
  console.log('register');
};



Login.login = function(e){
  if (e) e.preventDefault();
  console.log('login');
};

Login.logout = function(e){
  e.preventDefault();
  this.loggedOutState();
  this.removeToken();
};

Login.handleForm = function(e){
  e.preventDefault();

  const url    = `${Login.apiUrl}${$(this).attr('action')}`;
  const method = $(this).attr('method');
  const data   = $(this).serialize();

  return Login.ajaxRequest(url, method, data, data => {
    if (data.token) Login.setToken(data.token);
    Login.loggedInState();
  });
};

Login.ajaxRequest = function(url, method, data, callback){
  return $.ajax({
    url,
    method,
    data,
    beforeSend: this.setRequestHeader.bind(this)
  })
  .done(callback)
  .fail(data => {
    console.log(data);
  });
};

Login.setRequestHeader = function(xhr) {
  return xhr.setRequestHeader('Authorization', `Bearer ${this.getToken()}`);
};

Login.setToken = function(token){
  return window.localStorage.setItem('token', token);
};

Login.getToken = function(){
  return window.localStorage.getItem('token');
};

Login.removeToken = function(){
  return window.localStorage.clear();
};

Login.clearModal = function (){
  $('#registerModal').modal('hide');
  $('#loginModal').modal('hide');
};

$(Login.init.bind(Login));
