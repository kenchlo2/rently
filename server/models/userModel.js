const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: { type: Array }
});

userSchema.pre('save', async function(next) {
  try {
    /** https://mongoosejs.com/docs/middleware.html
     *  This is a pre-hook for "document middleware"; the this object refers to the document.
     */

    /** https://www.npmjs.com/package/bcrypt
     *  .hash(myPlainTextPassword, saltRounds) automatically generates a salt and then hash
     *  Otherwise, run .genSalt(saltRounds) to generate a salt, followed by .hash(myPlaintextPassword, salt)
     */
    if (this.isModified('password')) this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    next();
  } catch(err) {
    next({
      log: 'Error in encrypting password before saving in the database:' + JSON.stringify(err),
      message: { err: 'Error in encrypting password before saving in the database' }
    });
  }
});

userSchema.methods.verifyPassword = function(input, hash) {
  return bcrypt.compare(input, hash)
    .then(result => result)
    .catch(err => next({
      log: 'Error in verifying password:' + JSON.stringify(err),
      message: { err: 'Error in verifying password' }
    }));
}

module.exports = mongoose.model('User', userSchema);
