const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const  SALT_WORK_FACTOR = 10;
mongoose.connect('mongodb://localhost/blogger', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  userId: {type: ObjectId},
  email: {type: String, required: true, unique: true},
  userName: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isVerified: {type: Boolean, default: false},
  registerDate: {type: Date, default: Date.now}
})


UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  console.log(candidatePassword);
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};


const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
