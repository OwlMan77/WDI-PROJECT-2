const express     = require('express');
const router      = express.Router();

// const cinemasController  = require('../controllers/cinemas');
const statics     = require('../controllers/statics');

router.route('/')
  .get(statics.home);
//
// router.route('/cinemas')
// .get(cinemasController.index);

module.exports = router;
