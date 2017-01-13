const Cinema = require('../models/cinema');

function camerasIndex(req, res){
  Cinema.find((err, cinemas) => {
    if (err) return res.status(500).send();
    return res.status(200).json({cinemas});
  });
}

module.exports = {
  index: camerasIndex
};
