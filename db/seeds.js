const jmLocationData = require('../data/LocationHistory');
const Location       = require('../models/location');
const config         = require('../config/config');
const Promise        = require('bluebird');
const mongoose       = require('mongoose');
mongoose.Promise     = Promise;
const databaseURL    = config.db;
mongoose.connect(databaseURL);

Location.collection.drop();

Promise.map(jmLocationData.locations, (location, i) => {
  console.log(`${i}. JM was ${location.latitudeE7/10000000}, ${location.longitudeE7/10000000}`);
  return Location.create(location);
}).then(locations => {
  console.log(`JM was in ${locations.length} places`);
  return process.exit();
});
