const Login = Login || {};

Login.init = function(){
  this.apiUrl = 'http://localhost:3000/api';
  this.$main = $('main');
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('body').on('submit', 'form', this.handleForm);

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
  $('.modal-content').html(`
    <div class="modal-header">
      <h5 class="modal-title">Register</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form method="post" action="/register">
        <div class="form-group">
          <input class="form-control" type="text" name="user[username]" placeholder="Username">
        </div>
        <div class="form-group">
          <input class="form-control" type="email" name="user[email]" placeholder="Email">
        </div>
        <div class="form-group">
          <input class="form-control" type="password" name="user[password]" placeholder="Password">
        </div>
        <div class="form-group">
          <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
        </div>
        <div class="form-group">
          <input class="form-control" type="text" name="user[homePostcode]" placeholder="Home postcode">
        </div>
        <input class="btn btn-primary" type="submit" value="Register">
      </form>
    </div>
  `);

  $('.modal').modal('show');
};

Login.login = function(e){
  if (e) e.preventDefault();
  $('.modal-content').html(`
      <div class="modal-header">
        <h5 class="modal-title">Login</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form method="post" action="/login">
          <div class="form-group">
            <input class="form-control" type="email" name="email" placeholder="Email">
          </div>
          <div class="form-group">
            <input class="form-control" type="password" name="password" placeholder="Password">
          </div>
          <input class="btn btn-primary" type="submit" value="Login">
        </form>
      </div>
  `);

  $('.modal').modal('show');
};

Login.logout = function(e){
  e.preventDefault();
  this.loggedOutState();
  this.removeToken();
};

Login.handleForm = function(e){
  console.log('running');
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
