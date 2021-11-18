const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/',
  sessionController.isLoggedIn,
  (req, res) => {
    return res.status(200).send({ isLoggedIn: res.locals.isLoggedIn });
  }
);

module.exports = router;
