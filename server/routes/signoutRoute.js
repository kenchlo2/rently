const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.post('/',
  sessionController.endSession,
  (req, res) => {
    return res.status(200).send({ isLoggedIn: false });
  }
);

module.exports = router;
