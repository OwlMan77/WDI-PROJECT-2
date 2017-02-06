#Api info we are taking 

##Cinelist

* Cinemas	
	* id
	* name	 
* Cinema listings
	* listings
		* titles 
		* times 
<br>

``api.cinelist.co.uk/search/cinemas/postcode/:postcode``
``api.cinelist.co.uk/get/times/cinema/:venueID?day=<INT>``


##Google Places 
* Locations of the cinemas for the map.
	* Latitude: ``results.geometry.lat``
	* Longitude``results.geometry.lng``
<br>

We get this from location.lat, location.lang

https://maps.googleapis.com/maps/api/place/textsearch/json?query=[cinema]&key=YOUR_API_KEY

##OMDb API
* Poster: `obj.Poster`
* Rated: `obj.Rated`
* Review Score : `obj.Metascore`
* Short description : `obj.Plot`
* Director : `obj.Director`
* Genre: `obj.Genre`


<br>
``http://www.omdbapi.com/?t=[movie title]&y=&plot=short&r=json``