const Login = Login || {};
const google = google;

Login.init = function(){
  this.apiUrl = 'http://localhost:3000/api';
  this.$main = $('main');
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.addLocations').on('click', this.addLocations.bind(this));
  $('body').on('submit', 'form', this.handleForm);

  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }

  this.mapSetup();
};

Login.loggedInState = function(){
  $('.loggedIn').show();
  $('.loggedOut').hide();
  Login.getCurrentLocation();
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

Login.addLocations = function(e) {
  if (e) e.preventDefault();
  $('.modal-content').html(`
    <div class="modal-header">
      <h5 class="modal-title">Register</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form method="post" action="/locations">
        <div class="form-group">
          <input class="form-control" id="file" type="file" name="file" placeholder="Add JSON file">
        </div>
        <input class="btn btn-primary" type="submit" value="Add">
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
  e.preventDefault();

  $('.modal').modal('hide');
  const url    = `${Login.apiUrl}${$(this).attr('action')}`;
  const method = $(this).attr('method');
  var data;

  if ($(this).attr('action') === '/locations') {
    data = new FormData();
    data.append('file', $('#file')[0].files[0]);

    return $.ajax({
      url,
      method,
      data,
      beforeSend: Login.setRequestHeader.bind(Login),
      processData: false, // tell jQuery not to process the data
      contentType: false // tell jQuery not to set contentType
    })
    .done(data => {
      // Display
      // Login.createMarkersForLocations(data);
      console.log(data);
    })
    .fail(data => {
      console.log(data);
    });
  } else {
    data = $(this).serialize();

    return Login.ajaxRequest(url, method, data, data => {
      if (data.token) Login.setToken(data.token);
      Login.loggedInState();
    });
  }
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
  const token = `Bearer ${this.getToken()}`;
  return xhr.setRequestHeader('Authorization', token);
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

Login.mapSetup = () => {
  const canvas = document.getElementById('map-canvas');
  const mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(51.503640, -0.1276250),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  Login.map = new google.maps.Map(canvas, mapOptions);
};

Login.getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(function(position) {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    new google.maps.Marker({
      position: new google.maps.LatLng(pos.lat, pos.lng),
      map: Login.map,
      animation: google.maps.Animation.DROP
    });

    Login.getLocations();
  });
};

Login.getLocations = function() {
  $.get(`http://localhost:3000/api/locations`).done(Login.createMarkersForLocations);
};

Login.createMarkersForLocations = (locations) => {
  $.each(locations, (index, location) => {
    const latLng = new google.maps.LatLng(location.latitudeE7/10000000, location.longitudeE7/10000000);
    new google.maps.Marker({
      position: latLng,
      map: Login.map
      // icon: '/images/marker.png'
    });
  });
};

Login.addInfoWindowForCamera = (cinema, marker) => {
  google.maps.event.addListener(marker, 'click', () => {
    console.log('clicked');
  });
};

$(Login.init.bind(Login));
