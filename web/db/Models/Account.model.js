const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: String,
  passwordHash: String,
  address: String,
  accessLevel: Number
});

module.exports = mongoose.model('Account', AccountSchema, 'account');