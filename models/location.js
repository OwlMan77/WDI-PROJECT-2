const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const locationSchema = new Schema({
  timestampMs: { type: Date },
  latitudeE7: { type: Number },
  longitudeE7: { type: Number },
  accuracy: { type: Number },
  velocity: { type: Number },
  heading: { type: Number },
  altitude: { type: Number },
  activitys: [{ type: Schema.Types.Mixed }]
});

module.exports = mongoose.model('Location', locationSchema);
