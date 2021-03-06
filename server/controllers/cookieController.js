const cookieController = {};

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals._id, { httpOnly: true });
  next();
}

module.exports = cookieController;
