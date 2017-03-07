#WDI-24-Project-2

## Find JM

### How to use

Register using the toolbar and model provided or Login if previously registered and you should be able to see where I have been in the UK over the last 3 years while using google maps!

If you wish to upload your own data simply make sure you are logged in and click the 'Add locations data' on the toolbar. 

To mark locations on the map you will need to upload is the Takeout data from google, this can be done if you have a google account and use the link below!

[Takeout](https://takeout.google.com/settings/takeout)

Uncheck all the data selections, choose **Locations History** make sure it is in **JSON format**

![](https://lh3.googleusercontent.com/Sw0iMmF7HRKH2DtchL7Tu4zLOp_SRjxBR50jEOa0YxeENC-bkw7hHInLU9L5r2a8xpMXPFv2uP5qxt6-F9A_SwmJU9wP0EYVT12cG78vDHwlZtnqbQ96TV4WV-6j7MPXt603U6XkH7IB6K-eWdz5v_q4LLqygk5mpMHt2E4e40a9nvIoICYJ4pCvWV9gF7fjOjs_PH7gyfEWQMoImZTEFSa7Sxm-rbNkKFa_oqdm_J-1lUofJvts4V30LpONX9q4euh6QGwf3Fe_-mj6pyVk3Slf087JFWv91SvW_z7XWukMJOdk9RF5-1BCiKN0rU93tkusAO1bTQAE4hSNCJPjIUv7YYqBz5JTynh-hTfxq88mqQWvez2HFHoTIQ7kmCKMeI_A_X-KX5QX_K4F0kMa48YLNzCEbF-2ujt8SCvVmisfh6B8MVa7sjylvFW90W_ZlMVprQzMXsEaSwev3XPWLMI3b8wIGpNJEl4QKeKyXJXFg-0hSWjdMKQrLenDu75R6wBjl9JR0plEZVFf8prpnBtcWjAPhkqVcSAkm9-LMBXT3hNTlVkpNo0hmyNE2CbKvGLkCDbx=w1440-h736)

Upload your data and see where you have been on the map.

###Process

First thing I did was  

###Challenges 

Originally, I was making a cinema listings map that would be able to show the nearest cinema with film showings and reviews of those films. 

I was using the [Cinelist API](`http://www.cinelist.co.uk/`) which scraped data from FindAnyFilm.com and google places API to get the geolocations cinema's coordinates that would be represented on a google map. The idea was that could click on those points to get the cinema listings and times. I would then implement the OMDb API get reviews and Movie Poster to appear when you click on the listing.

During that time I learned the joys of API call limits, 

On the final day of coding (The day before presentation), the cinelist API had lost it's security certificate making me unable to to retrieve any data.

![](https://media.giphy.com/media/ijFI5bqztBw9a/giphy.gif)

Two calls were made from the cinelist API (to get the Cinema info and the listings for each Cinema), leaving the project unsalvagable at that point. So unfortunately I had to move towards making a less complicated project within a much shorter time period.

Fun times!

Challenges I had in the final itertation of this project was deciding how I would get the data to plot, realising I would need to use promises and understanding how to use promises to plot the data on the map. However, I was able successfully implement promise to save JSON data using the Bluebird library. it was interesting to see how this  

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
