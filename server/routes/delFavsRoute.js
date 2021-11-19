const express = require('express');
const router = express.Router();
const favsController = require('../controllers/favsController');

router.post('/',
  favsController.delFavs,
  (req, res) => {
    return res.status(200).send({ favsArr: res.locals.favsArr });
  }
);

module.exports = router;
