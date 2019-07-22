const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  serverinfo: {
    serverurl: {
      type: String,
      required: true,
    },
    servername: {
      type: String,
      required: true,
    },
  },
  headers: {
    'X-Auth-Token': {
      type: String,
      required: true,
    },
    'X-User-Id': {
      type: String,
      required: true,
    },
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: {
      expires: '5m',
    },
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
