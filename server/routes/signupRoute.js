const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');

router.post('/',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.endSession,
  sessionController.startSession,
  (req, res) => {
    return res.status(200).send({ success: true });
  }
);

module.exports = router;
