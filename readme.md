#WDI-24-Project-2

## Find JM

### How to use

![](https://lh3.googleusercontent.com/alXtJ4FuKNxIYy8RtfuhQBG2cKh9zIwYE-ixZsW_CBZntCya38uRgZiYdFLz9BVuHFZdrEhU0aIQZbTU_zjg8JnoCEwWSdFj5pcAokE8w_TncWD866i-MvQKCPE7hiUwpVVNiA213XTMTp7SOSakSmxyN8Wo0tmDrtcD_CflhubRse37yfwlF6-1qxEMYWfArDawGISCgZ2En5mSEjFNekrI0HbYwyO0BV6lII5w752o4-rUiTb2wMj-TFnN8gUckrf_nKBE01tkqAXUq6js5w8COd3vu7mR6uFYc2lLJXxSRSuJe2gRUCw6igoMqwKELDsqbEpJgE2cInmqBvPX0-ABzbYX6l2eesbQO2kLdZ9sY1L-hPLOHoUS_CoABhb5Ev0zPwOvbu-fVQlRzaqUOIXuedUqy3vSRL6Iveykte7u9i_E6UzrTGMZLI5Ct5P4GvEq7VKIT5nF0zJ2pgtfQe3wmngSa7Ea_AgUrQ4k7PpqZupujeWO1weLyH8ynxVZKRccPD_aHqh7TUVrG_S3CRcR89vpKW3HN4GNq7UIVKP6sFY1acZjpEDT5rq__79Fo3sxbZEt=w1281-h733)

Register using the toolbar and model provided or Login if previously registered and you should be able to see where I have been in the UK over the last 3 years while using google maps!

If you wish to upload your own data simply make sure you are logged in and click the 'Add locations data' on the toolbar. 

To mark locations on the map you will need to upload is the Takeout data from google, this can be done if you have a google account and use the link below!

[Takeout](https://takeout.google.com/settings/takeout)

Uncheck all the data selections, choose **Locations History** make sure it is in **JSON format**

![](https://lh3.googleusercontent.com/Sw0iMmF7HRKH2DtchL7Tu4zLOp_SRjxBR50jEOa0YxeENC-bkw7hHInLU9L5r2a8xpMXPFv2uP5qxt6-F9A_SwmJU9wP0EYVT12cG78vDHwlZtnqbQ96TV4WV-6j7MPXt603U6XkH7IB6K-eWdz5v_q4LLqygk5mpMHt2E4e40a9nvIoICYJ4pCvWV9gF7fjOjs_PH7gyfEWQMoImZTEFSa7Sxm-rbNkKFa_oqdm_J-1lUofJvts4V30LpONX9q4euh6QGwf3Fe_-mj6pyVk3Slf087JFWv91SvW_z7XWukMJOdk9RF5-1BCiKN0rU93tkusAO1bTQAE4hSNCJPjIUv7YYqBz5JTynh-hTfxq88mqQWvez2HFHoTIQ7kmCKMeI_A_X-KX5QX_K4F0kMa48YLNzCEbF-2ujt8SCvVmisfh6B8MVa7sjylvFW90W_ZlMVprQzMXsEaSwev3XPWLMI3b8wIGpNJEl4QKeKyXJXFg-0hSWjdMKQrLenDu75R6wBjl9JR0plEZVFf8prpnBtcWjAPhkqVcSAkm9-LMBXT3hNTlVkpNo0hmyNE2CbKvGLkCDbx=w1440-h736)

Upload your data and see where you have been on the map.
![](https://lh3.googleusercontent.com/qrpIWRYAGedZJ3nNK6RrmT0LYC4fenZi_mJJYiszfClDQVfw-TUnLJPSSbVODwVSAuIiiS7KCB25I8MuCm8-5KVaGWuH0cH2zQ9LtkgmmT_QgUoRDCvtyiYT6tPsXtbYeuMLHjovaC_OlD5G6chaNI8bIEO4tggaJB3fMYwiec2T9TtKTuFeeZ4V0gsJvWrOZfPyatV8nifumUi8QJvxYwGMvhHhPCJ-0Y7G7sLpsiM6zmLp2nGkm60vVXv1s_wbDNg6xhYMbCKqrQ0q6xPW0-r58kPy--3llFEvXryTnD3ir4-cWB-k7LKJAMbWVx7W_xuby33LxFR-omhUg0ZCIJ7dlief1Iv_BwYNbddVcPQZQOkXf6zDY9ZMTCzhcXOZa5MVTPWSN91mTAt4L3__Gdvwlv2tjqNN-0s7drIQDnE6Ve9Ijw7F0JWtWVHs7jeoYZVrjaLtvW_wsmJ6-DYa_-ScivvBR1aL5EE82tnrMkGIbys768lvZXfM8Azu95_HFODLmVEqZA8OZjiekgeUQr6bn4PZeDTVSSqrflbWddVpWyfXu0mR2m73EQHgm2_e5jvq-tjY=w1281-h733)

###Process

From my original project, I was able to salvage my authentication system and google map with current geolocation. I had create a noSql model called User and had made API routes using CRUD methodology. To create login authetication, I made a JWT authentication controller. While in my User model used bcrypt to make a PasswordHash. 

I also included validation functions for Password, User and email. I also had already created a login and register model with post requests to my API.

Implementing Google Maps was relavitely simple as all then needed to be done was add the Google Maps script and create a container div in the index.html then create a function in login.js to setup the map. I also used HTML5S Geolocation GetCurrentPosition method to determine the User's Current location and then I created a marker on the map using `google.maps.Marker`.

From that point on the first thing I did when I decided on what to do was create a model called `location` with an api route and a controller. This would accept all the data from the takeout JSON data and save it to the database.

I then implemented Multer(a file upload module) with a upload directory to act as storage, I then implemented a promise in the locations controllerto create a location for each location in a JSON file uploaded.

###Challenges 

Originally, I was making a cinema listings map that would be able to show the nearest cinema with film showings and reviews of those films. 

I was using the [Cinelist API](`http://www.cinelist.co.uk/`) which scraped data from FindAnyFilm.com and google places API to get the geolocations cinema's coordinates that would be represented on a google map. The idea was that could click on those points to get the cinema listings and times. I would then implement the OMDb API get reviews and Movie Poster to appear when you click on the listing.

During that time I learned the joys of API call limits (Especially with the google places API) and the diffculity of making API call based on the results of previous API calls. 

On the final day of coding (The day before presentation), the cinelist API had lost it's security certificate making me unable to to retrieve any data.

![](https://media.giphy.com/media/ijFI5bqztBw9a/giphy.gif)

Two calls were made from the cinelist API (to get the Cinema info and the listings for each Cinema), leaving the project almost completely unsalvagable. So unfortunately I had to move towards making a less complicated project within a much shorter time period.

Fun times!

Challenges I had in the final itertation of this project was deciding how I would get the data to plot, realising I would need to use promises and understanding how to use promises to plot the data on the map. However, I was able successfully implement promise to save JSON data using the Bluebird library.  

For both iterations, I had trouble properly adding models properly. However I was successful able to do so once I figured that I could change the content of the same model for multiple purposes.

### What I would do differently
* Made sure to use a larger company's API or scape the data myself using cheerio.js, if a stable source is not available. I had trouble finding a reliable cinema API that had mulitple    
* Made sure the project was more modular in the use of APIs and have not it be dependant on one API for a large amount of it's data rather than using two API calls.  

###Future changes 

* Make it less embrassing for myself and add more location data!
* Add some UX to make it easier for users to upload data
* Different icons depending on the method of travel 
* Further styling have a better theme than what I have currently 
* Look into Heat maps for when there is a lot of points in one area. 

###Techology used

####Node
* Mongoose
* Express
* JWT
* Bcrypt


#### CSS
* Bootstrap 