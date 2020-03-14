const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
  username: String,
  isAvailable: Boolean,
  createdOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', OrderSchema, 'order');