const User = require('../models/userModel');
const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const doc = await User.create({ username, password });
    res.locals._id = doc._id.toString();
    next();
  } catch(err) {
    next({
      log: 'userController.createUser: ERROR: ' + JSON.stringify(err),
      message: { err }
    });
  }  
};

userController.verifyLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const doc = await User.findOne({ username }).exec();
    const verified = doc ? await doc.verifyPassword(password, doc.password) : false;
    if (! verified) return next({
      log: 'userController.verifyLogin: ERROR: ' + 'Incorrect password!',
      message: { err: 'Incorrect username or password!' }
    });
    res.locals._id = doc._id.toString();
    next(); 
  } catch(err) {
    next({
      log: 'userController.verifyLogin: ERROR: ' + JSON.stringify(err),
      message: { err }
    });
  }
};

module.exports = userController;
