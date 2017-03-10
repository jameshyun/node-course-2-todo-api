const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// update method
// Instance methods with methods
// what exactly gets sent back when a mongoose model is converted into a JSON value
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['email', '_id']);
};

// Instance methods with methods
// no arrow function since we need this
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => { // return promise to be called in the server
    return token;
  });
};

// Model methods with statics
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  // if any error happens in try block, try block automatically stop execution and move to catch block and run some code there and continues on with ur program
  try {
    decoded = jwt.verify(token, 'abc123')
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // })
    return Promise.reject();// same as above. when u pass an value as param, then caller will use it as 'e' in catch block
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token, // used '' for key to access object's properties
    'tokens.access': 'auth'
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};




/**
 * validator to check email.
 *
 * To create methods, we need to use Schema rather than just model before
 */