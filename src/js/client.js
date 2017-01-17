const googleMap     = {} || googleMap;
const google        = google;
const titleCssClass = 'titles';
const timesCssClass = 'times';
const MapStyle      = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road","elementType":"geometry","stylers":[{"saturation":"14"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"lightness":"4"},{"color":"#a92a2a"},{"saturation":"-31"},{"gamma":"0.67"},{"weight":"1.19"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#151526"},{"lightness":17}]}];

googleMap.mapSetup = () => {
  $('.bob').on('click', googleMap.getCurrentLocation);

  const canvas = document.getElementById('map-canvas');

  const mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(51.503640, -0.1276250),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: MapStyle,
    mapTypeControl: false
  };

  googleMap.map = new google.maps.Map(canvas, mapOptions);
};

googleMap.getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(function(position) {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    new google.maps.Marker({
      position: new google.maps.LatLng(pos.lat, pos.lng),
      map: googleMap.map,
      animation: google.maps.Animation.DROP
    });

    googleMap.getCinemas(pos);
  });
};


googleMap.getCinemas = function(pos) {
  $.get(`http://localhost:3000/api/cinemas/${pos.lat}/${pos.lng}`).done(googleMap.getLatLng);
};

googleMap.getLatLng = function(data) {
  console.log('running');

  $.each(data, (index, cinema) => {
    const name = cinema.name.split(',')[0];

    if (name.indexOf('-') === -1) {
      $
      .get(`http://localhost:3000/api/cinemas/${name}`)
      .done(data => {

        if (!data) alert('No cinemas nearby, see ya later you dirty animal!');
        // IF STATEMENT TO SEE IF ANY ARE RETURNED
        // IF NO DATA SHOW MESSAGE ON SCREEN SAYING NO CINEMA'S NEAR YOU

        cinema.formattedAddress = data.results[0].formatted_address;
        cinema.rating           = data.results[0].rating;
        cinema.lat              = data.results[0].geometry.location.lat;
        cinema.lng              = data.results[0].geometry.location.lng;

        googleMap.createMarkerForCinemas(cinema);
      });
    }
  });
};


googleMap.createMarkerForCinemas = (cinema) => {
  const latLng = new google.maps.LatLng(cinema.lat, cinema.lng);
  const marker = new google.maps.Marker({
    position: latLng,
    map: googleMap.map,
    icon: '/images/marker.png'
  });

  // googleMap.addInfoWindowForCamera(cinema, marker);
};


googleMap.addInfoWindowForCamera = (cinema, marker) => {
  google.maps.event.addListener(marker, 'click', () => {
    console.log('clicked');
    googleMap.getListings(cinema);
  });
};
googleMap.getListings = function(cinema, marker) {
  console.log('listings');
  $.get(`https://api.cinelist.co.uk/get/times/cinema/${cinema.id}`).done(data => googleMap.getTitlesAndTimes(data, cinema, marker));
  // $.get(`http://localhost:3000/api/cinemas/listings/${cinema.id}`).done(data => console.log(data));
};

googleMap.getTitlesAndTimes = function(data, cinema, marker) {
  let info = '';
  $.each(data.listings, (index, data) => {
    const timeInfo = data.listings[index].times.join(', ' );
    info = info +`<li class = ${titleCssClass}>${data.listings[index].title}:</li><li class = ${timesCssClass}>${timeInfo}</li>`;
  });

  if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();
  this.infoWindow = new google.maps.InfoWindow({
    content: `<h3>${cinema.formattedAddress}</h3><ul>${info}</ul>`
  });
  this.infoWindow.open(this.map, marker);
  console.log(data);
};

$(googleMap.mapSetup.bind(googleMap));
