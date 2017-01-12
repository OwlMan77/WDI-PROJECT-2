const mongoose = require('mongoose');
const databaseURL = 'mongodb://localhost:27017/localhost/eiga_wdi_project_2';
mongoose.connect(databaseURL);

const Cinema = require('./models/cinema');

Cinema.collection.drop();
