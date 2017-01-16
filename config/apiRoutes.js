const express            = require('express');
const router             = express.Router();

const authentications    = require('../controllers/authentications');
const cinemas            = require('../controllers/cinemas');

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

router.route('/cinemas/:lat/:lng')
  .get(cinemas.find);

module.exports = router;
