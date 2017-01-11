const express          = require('express');
const morgan           = require('morgan');
const bodyparser       = require('body-parser');
const cors             = require('cors');
const mongoose         = require('mongoose');
const expressJWT       = require('express-jwt');

const app              = express();
