const Location = require('../models/location');
const path     = require('path');
const Promise  = require('bluebird');

function locationsCreate(req, res) {
  if (!req.file) return res.status(500).json({ message: 'No file.' });
  const json = require(path.join(__dirname, `../${req.file.path}`));



  //req.file.name
  // formData.append(name, blob, filename)


  // console.log(typeof(json));


  Promise.map(json.locations, (location, i) => {
    return Location.create(location);
  }).then(locations => {
    return res.status(200).json(locations);
  }).catch(err => {
    return res.status(500).json(err);
  });
}

function locationsIndex(req, res) {
  Location
  .find()
  .then(locations => {
    console.log(locations.length, 'found');
    return res.status(200).json(locations);
  })
  .catch(err => {
    return res.status(500).json(err);
  });
}

module.exports = {
  index: locationsIndex,
  create: locationsCreate
};
