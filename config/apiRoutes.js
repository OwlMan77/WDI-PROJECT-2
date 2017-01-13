const express         = require('express');
const router          = express.Router();

const authentications = require('../controllers/authentications');
const cinemasController         = require('../controllers/cinemas')

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

router.route('/cameras')
.get(cinemasController.index);

module.exports = router;
