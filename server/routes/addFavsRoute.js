const express = require('express');
const router = express.Router();
const favsController = require('../controllers/favsController');

router.post('/',
  favsController.addFavs,
  (req, res) => {
    return res.status(200).send('addFavs route success');
  }
);

module.exports = router;