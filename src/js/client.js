const googleMap     = {} || googleMap;
const google        = google;
const titleCssClass = 'titles';
const timesCssClass = 'times';
const MapStyle      = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road","elementType":"geometry","stylers":[{"saturation":"14"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"lightness":"4"},{"color":"#a92a2a"},{"saturation":"-31"},{"gamma":"0.67"},{"weight":"1.19"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#151526"},{"lightness":17}]}];

googleMap.mapSetup = function() {
  $('.bob').on('click', this.getCurrentLocation);

  const canvas = document.getElementById('map-canvas');

  const mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(51.503640, -0.1276250),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: MapStyle,
    mapTypeControl: false
  };

  this.map = new google.maps.Map(canvas, mapOptions);
  // this.getCinemas();
  // this.getCurrentLocation();
  // this.map.center(pos);
  // this.createYouMarker(pos);
};

googleMap.getLatLng = function(data) {
  $.each(data.cinemas, (index, cinema) {
    // for each cinema, make a call to google places link
    // in the callback for this request, add the lat/lng values to the cinema objects.
  });

  
};

googleMap.getCurrentLocation = function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    console.log('location found');

    $
      .get(`http://localhost:3000/api/cinemas/${pos.lat}/${pos.lng}`)
      .done(data => this.getLatLng);
  });
};


googleMap.getCinemas = function() {
  $.get('http://localhost:3000/cinemas').done(this.loopThroughCinemas);
};

googleMap.loopThroughCinemas = function(data) {
  $.each(data.cinemas, (index, cinema) => {
    googleMap.createMarkerForCinemas(cinema);
  });
};

googleMap.createMarkerForCinemas = function(cinema) {
  console.log(cinema.lng);
  const latLng = new google.maps.LatLng(cinema.lat, cinema.lng);
  const marker = new google.maps.Marker({
    position: latLng,
    map: this.map,
    // icon: '/images/marker.png',
    animation: google.maps.Animation.DROP
  });
  this.addInfoWindowForCamera(cinema, marker);
};

// googleMap.createYouMarker = function(pos){
//   const latLng = new google.maps.LatLng(pos);
//   const marker = new google.maps.Marker({
//     position: latLng,
//     // icon: '/images/marker.png',
//     animation: google.maps.Animation.DROP
//   });
//   marker.setMap(googleMap.map);
// };

googleMap.addInfoWindowForCamera = function(cinema, marker){
  google.maps.event.addListener(marker, 'click', () => {
    let info = '';
    $.each(cinema.listings, (index) => {
      const timeInfo = cinema.listings[index].times.join(', ' );
      info = info +`<li class = ${titleCssClass}>${cinema.listings[index].title}:</li><li class = ${timesCssClass}>${timeInfo}</li>`;
    });
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();
    this.infoWindow = new google.maps.InfoWindow({
      content: `<h3>${cinema.address}</h3> <ul>${info}</ul>`
    });
    this.infoWindow.open(this.map, marker);
  });
};

$(googleMap.mapSetup.bind(googleMap));
