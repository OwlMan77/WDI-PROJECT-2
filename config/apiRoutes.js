const express            = require('express');
const router             = express.Router();

const authentications    = require('../controllers/authentications');
const cinemas            = require('../controllers/cinemas');

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

router.route('/cinemas/listings/:id')
  .get(cinemas.listing);

router.route('/cinemas/:lat/:lng')
  .get(cinemas.find);

router.route('/cinemas/:name')
  .get(cinemas.location);



module.exports = router;
