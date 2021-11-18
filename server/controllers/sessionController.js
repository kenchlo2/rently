const Session = require('../models/sessionModel');

const sessionController = {};

// stores SSID in mongo
sessionController.startSession = (req, res, next) => {
  Session.create({ cookieId: res.locals._id })
  // Session.findOneAndUpdate({ cookieId: res.locals._id }, { upsert: true, new: true })
    .then(doc => next())
    .catch(err => next('Error in sessionController.startSession: ' + JSON.stringify(err)));
};

sessionController.endSession = (req, res, next) => {
  Session.findOneAndDelete({ cookieId: req.cookies.ssid })
    .then(doc => next())
    .catch(err => next({
      log: 'sessionController.endSession: ERROR: ' + JSON.stringify(err),
      message: { err }
    }));
};

sessionController.isLoggedIn = async (req, res, next) => {
  const ssid = req.cookies.ssid;
  res.locals.isLoggedIn = false;
  if (ssid) {
    const doc = await Session.findOne({ cookieId: ssid });
    if (doc) res.locals.isLoggedIn = true;
  }
  next();
};

module.exports = sessionController;
