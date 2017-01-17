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
    console.log(cinemas);
    return res.status(200).json(cinemas);
  })
  .catch(err => {
    console.log(err);
  });
}

function cinemasLocation(req, res) {
  rp(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.params.name}&key=AIzaSyAtozr4wrjNbn2qNN8kno2Je28pt3xYI8I`)
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
  location: cinemasLocation
};
