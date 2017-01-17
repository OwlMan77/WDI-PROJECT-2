const Cinema = require('../models/cinema');
const rp     = require('request-promise');

function cinemasIndex(req, res){
  Cinema.find((err, cinemas) => {
    if (err) return res.status(500).send();
    return res.status(200).json({cinemas: cinemas});
  });
}

function cinemasFind(req, res) {
  rp(`http://api.cinelist.co.uk/search/cinemas/coordinates/${req.params.lat}/${req.params.lng}`)
  .then(htmlString => {
    const json = JSON.parse(htmlString);
    const cinemas = json.cinemas.filter(cinema => cinema.distance < 2 );
    return res.status(200).json(cinemas);
  })
  .catch(err => {
    console.log(err);
  });
}

function cinemasLocation(req, res) {
  rp(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.params.name}&key=AIzaSyABATfVy66u30SKbWayzK3P-aLmkTYnPt0`)
  .then(htmlString => {
    const json = JSON.parse(htmlString);
    return res.status(200).json(json);
  })
  .catch(err => {
    console.log(err);
  });
}

function cinemasListing(req, res) {
  console.log('running listings');
  rp(`https://api.cinelist.co.uk/get/times/cinema/${req.params.id}`)
  .then(htmlString => {
    const json = JSON.parse(htmlString);
    return res.status(200).json(json);
  })
  .catch(err => {
    console.log(err);
  });
}

module.exports = {
  index: cinemasIndex,
  find: cinemasFind,
  location: cinemasLocation,
  listing: cinemasListing
};
