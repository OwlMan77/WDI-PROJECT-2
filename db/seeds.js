const mongoose = require('mongoose');
const databaseURL = 'mongodb://localhost:27017/localhost/eiga_wdi_project_2';
mongoose.connect(databaseURL);

const Cinema = require('./models/cinema');

Cinema.collection.drop();


const cinema1 = new Cinema({
  id: {type: String},
  name: {type: String},
  location: {type: String},
  lisitngs: {type: Object}
});

const cinema2 = new Cinema({
  id: {type: String},
  name: {type: String},
  location: {type: String},
  lisitngs: {type: Object}
});




// id: {type: String},
// name: {type: String},
// location: {type: String},
// lisitngs: {type: Object}
