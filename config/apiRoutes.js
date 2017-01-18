const express         = require('express');
const router          = express.Router();
const multer          = require('multer');
const path            = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  }
});

const upload = multer({ storage: storage });
const authentications = require('../controllers/authentications');
const locations       = require('../controllers/locations');

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);
router.route('/locations')
  .get(locations.index)
  .post(upload.single('file'), locations.create);

module.exports = router;
