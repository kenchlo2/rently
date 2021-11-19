const User = require('../models/userModel');
const favsController = {};

favsController.addFavs = (req, res, next) => {
  if (! req.cookies.ssid) {
    return next({
      log: 'favsController.addFavs: ERROR: ' + 'User not logged in!',
      message: { err: 'User not logged in!' }
    });
  } else {
    User.findById(req.cookies.ssid)
      .then(user => {
        const favs = user.favorites;
        const found = favs.map(fav => fav.ZPID).includes(req.body.favorite.ZPID);
        if (! found) {
          favs.push(req.body.favorite);
          user.favorites = favs;
          user.save();
        }
      })
      .then(() => next())
      .catch(err => next({
        log: 'favsController.addFavs: ERROR: ' + JSON.stringify(err),
        message: { err }
      }));
  }
};

favsController.getFavs = (req, res, next) => {
  if (! req.cookies.ssid) {
    return next({
      log: 'favsController.getFavs: ERROR: ' + 'User not logged in!',
      message: { err: 'User not logged in!' }
    });
  } else {
    User.findById(req.cookies.ssid)
      .then(user => {
        res.locals.favsArr = user.favorites;
      })
      .then(() => next())
      .catch(err => next({
        log: 'favsController.getFavs: ERROR: ' + JSON.stringify(err),
        message: { err }
      }));
    }
};

favsController.delFavs = (req, res, next) => {
  if (! req.cookies.ssid) {
    return next({
      log: 'favsController.delFavs: ERROR: ' + 'User not logged in!',
      message: { err: 'User not logged in!' }
    });
  } else {
    User.findById(req.cookies.ssid)
      .then(user => {
        user.favorites.splice(req.body.idx, 1);
        user.save();
        res.locals.favsArr = user.favorites;
      })
      .then(() => next())
      .catch(err => next({
        log: 'favsController.delFavs: ERROR: ' + JSON.stringify(err),
        message: { err }
      }));
    }
};

module.exports = favsController;
