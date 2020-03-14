const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
  username: String,
  isAvailable: Boolean
});

module.exports = mongoose.model('Delivery', DeliverySchema, 'delivery');