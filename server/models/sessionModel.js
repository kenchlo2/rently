const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// session expires in 1800s = 30min
const sessionSchema = new Schema({
  cookieId: { type: String, required: true },
  createdAt: { type: Date, expires: 1800, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);