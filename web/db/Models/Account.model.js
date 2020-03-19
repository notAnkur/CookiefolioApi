const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: String,
  passwordHash: String,
  address: String,
  accessLevel: Number // 1->user, 2->delivery drivers, 3->admin
});

module.exports = mongoose.model('Account', AccountSchema, 'account');