const mongoose  = require('mongoose');

const cinemaSchema = new mongoose.Schema({
  id: {type: String},
  name: {type: String},
  lat: {type: String},
  lng: {type: String},
  listings: {type: Array,
    listing: {
      type: Object
    }}
});

module.exports = mongoose.model('Cinema', cinemaSchema);
