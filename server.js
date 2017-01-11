const express          = require('express');
const morgan           = require('morgan');
const bodyparser       = require('body-parser');
const cors             = require('cors');
const mongoose         = require('mongoose');
const expressJWT       = require('express-jwt');

const app              = express();
const config           = require('./config/config.js');

mongoose.connect(config.db);

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded( {extended: true}));
app.use(cors);
app.use(express.static(`${__dirname}/public`));

app.listen(config.port, console.log(`Express is running on: ${config.port}`));
