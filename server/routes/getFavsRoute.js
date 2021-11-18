const express = require('express');
const router = express.Router();
const favsController = require('../controllers/favsController');

router.post('/',
  [ favsController.getFavs ],
  (req, res) => {
    console.log('RES LOCALS GET FAVS', res.locals.favsArr);
    return res.status(209).send({ favsArr: res.locals.favsArr });
  }
);

module.exports = router;
