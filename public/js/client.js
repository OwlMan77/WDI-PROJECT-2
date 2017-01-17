"use strict";var googleMap={}||googleMap,google=google,titleCssClass="titles",timesCssClass="times",MapStyle=[{featureType:"all",elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#000000"},{lightness:40}]},{featureType:"all",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#000000"},{lightness:16}]},{featureType:"all",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:17},{weight:1.2}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#000000"},{lightness:21}]},{featureType:"road",elementType:"geometry",stylers:[{saturation:"14"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:17}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:29},{weight:.2}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#000000"},{lightness:18}]},{featureType:"road.local",elementType:"geometry",stylers:[{lightness:"4"},{color:"#a92a2a"},{saturation:"-31"},{gamma:"0.67"},{weight:"1.19"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#000000"},{lightness:19}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#151526"},{lightness:17}]}];googleMap.mapSetup=function(){$(".bob").on("click",googleMap.getCurrentLocation);var e=document.getElementById("map-canvas"),o={zoom:13,center:new google.maps.LatLng(51.50364,(-.127625)),mapTypeId:google.maps.MapTypeId.ROADMAP,styles:MapStyle,mapTypeControl:!1};googleMap.map=new google.maps.Map(e,o)},googleMap.getLatLng=function(e){$.each(e.cinemas,function(e,o){$.get("http://localhost:3000/api/cinemas/"+o.name).done(function(e){console.log(e.cinemas),o.lat=e.results.geometry.location.lat,o.lng=e.results.geometry.location.lng})}),googleMap.loopThroughCinemas(e.cinemas)},googleMap.getCurrentLocation=function(){navigator.geolocation.getCurrentPosition(function(e){var o={lat:e.coords.latitude,lng:e.coords.longitude};console.log("location found"),$.get("http://localhost:3000/api/cinemas/"+o.lat+"/"+o.lng).done(googleMap.getLatLng)})},googleMap.getCinemas=function(){$.get("http://localhost:3000/cinemas").done((void 0).loopThroughCinemas)},googleMap.loopThroughCinemas=function(e){$.each(e.cinemas,function(e,o){googleMap.createMarkerForCinemas(o)})},googleMap.createMarkerForCinemas=function(e){console.log(e.lng);var o=new google.maps.LatLng(e.lat,e.lng),t=new google.maps.Marker({position:o,map:(void 0).map,animation:google.maps.Animation.DROP});(void 0).addInfoWindowForCamera(e,t)},googleMap.addInfoWindowForCamera=function(e,o){google.maps.event.addListener(o,"click",function(){var t="";$.each(e.listings,function(o){var l=e.listings[o].times.join(", ");t+="<li class = "+titleCssClass+">"+e.listings[o].title+":</li><li class = "+timesCssClass+">"+l+"</li>"}),"undefined"!=typeof(void 0).infoWindow&&(void 0).infoWindow.close(),(void 0).infoWindow=new google.maps.InfoWindow({content:"<h3>"+e.address+"</h3> <ul>"+t+"</ul>"}),(void 0).infoWindow.open((void 0).map,o)})},$(googleMap.mapSetup.bind(googleMap));