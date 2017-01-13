const Cinema = require('../models/cinema');

function cinemasIndex(req, res){
  Cinema.find((err, cinemas) => {
    if (err) return res.status(500).send();
    return res.status(200).json({cinemas: cinemas});
  });
}

module.exports = {
  index: cinemasIndex
};
