const mongoose  = require('mongoose');

const cinemaSchema = new mongoose.Schema({
  id: {type: String},
  name: {type: String},
  location: {type: String},
  lisitngs: {type: Object}
});

module.exports = mongoose.model('Cinema', cinemaSchema);
