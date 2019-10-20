var uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let userSchema = new Schema({
    pin: {
      type: String,
      min: [4, 'Pin must be 4 digits long'],
      max: [4, 'Pin must be 4 digits long'],
      required: [true, '4 digit pin is a required field']
    },
    email: {
      type: String,
      required: [true, 'Email is a required field']
    },
    phone: {
      type: String,
    },
    card: {
      type: Array,
    },
    authenticated: {
      type: Boolean,
      default: false
    }
});

module.exports = mongoose.model('User', userSchema);
