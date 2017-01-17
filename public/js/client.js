"use strict";var googleMap={}||googleMap,google=google,titleCssClass="titles",timesCssClass="times",MapStyle=[{featureType:"all",elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#000000"},{lightness:40}]},{featureType:"all",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#000000"},{lightness:16}]},{featureType:"all",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:17},{weight:1.2}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#000000"},{lightness:21}]},{featureType:"road",elementType:"geometry",stylers:[{saturation:"14"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:17}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:29},{weight:.2}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#000000"},{lightness:18}]},{featureType:"road.local",elementType:"geometry",stylers:[{lightness:"4"},{color:"#a92a2a"},{saturation:"-31"},{gamma:"0.67"},{weight:"1.19"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#000000"},{lightness:19}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#151526"},{lightness:17}]}];googleMap.mapSetup=function(){$(".bob").on("click",googleMap.getCurrentLocation);var e=document.getElementById("map-canvas"),o={zoom:13,center:new google.maps.LatLng(51.50364,(-.127625)),mapTypeId:google.maps.MapTypeId.ROADMAP,styles:MapStyle,mapTypeControl:!1};googleMap.map=new google.maps.Map(e,o)},googleMap.getCurrentLocation=function(){navigator.geolocation.getCurrentPosition(function(e){var o={lat:e.coords.latitude,lng:e.coords.longitude};new google.maps.Marker({position:new google.maps.LatLng(o.lat,o.lng),map:googleMap.map,icon:"/images/marker.png",animation:google.maps.Animation.DROP}),googleMap.getCinemas(o)})},googleMap.getCinemas=function(e){$.get("http://localhost:3000/api/cinemas/"+e.lat+"/"+e.lng).done(googleMap.getLatLng)},googleMap.getLatLng=function(e){console.log("running"),$.each(e,function(e,o){var t=o.name.split(",")[0];t.indexOf("-")===-1&&$.get("http://localhost:3000/api/cinemas/"+t).done(function(e){console.log(e),o.formattedAddress=e.results[0].formatted_address,o.rating=e.results[0].rating,o.lat=e.results[0].geometry.location.lat,o.lng=e.results[0].geometry.location.lng,googleMap.createMarkerForCinemas(o)})})},googleMap.createMarkerForCinemas=function(e){var o=new google.maps.LatLng(e.lat,e.lng);new google.maps.Marker({position:o,map:googleMap.map})},googleMap.addInfoWindowForCamera=function(e,o){google.maps.event.addListener(o,"click",function(){var t="";$.each(e.listings,function(o){var l=e.listings[o].times.join(", ");t+="<li class = "+titleCssClass+">"+e.listings[o].title+":</li><li class = "+timesCssClass+">"+l+"</li>"}),"undefined"!=typeof(void 0).infoWindow&&(void 0).infoWindow.close(),(void 0).infoWindow=new google.maps.InfoWindow({content:"<h3>"+e.address+"</h3> <ul>"+t+"</ul>"}),(void 0).infoWindow.open((void 0).map,o)})},$(googleMap.mapSetup.bind(googleMap));