const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
  username: String,
  assignedOrderId: {type: String, default: null},
  isAvailable: Boolean
});

module.exports = mongoose.model('Delivery', DeliverySchema, 'delivery');