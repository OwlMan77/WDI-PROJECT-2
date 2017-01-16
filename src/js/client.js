const googleMap     = {} || googleMap;
const google        = google;
const titleCssClass = 'titles';
const timesCssClass = 'times';
const MapStyle      = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road","elementType":"geometry","stylers":[{"saturation":"14"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"lightness":"4"},{"color":"#a92a2a"},{"saturation":"-31"},{"gamma":"0.67"},{"weight":"1.19"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#151526"},{"lightness":17}]}];

googleMap.mapSetup = function() {
  const canvas = document.getElementById('map-canvas');
  const mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: MapStyle
  };
  this.map = new google.maps.Map(canvas, mapOptions);
  this.getCinemas();
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
  //for each cinema.listing print title
  console.log(cinema.lat, cinema.lng);
  const latLng = new google.maps.LatLng(cinema.lat, cinema.lng);
  const marker = new google.maps.Marker({
    position: latLng,
    map: this.map,
    // icon: '/images/marker.png',
    animation: google.maps.Animation.DROP
  });
  this.addInfoWindowForCamera(cinema, marker);
};

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
