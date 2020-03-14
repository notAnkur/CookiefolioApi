const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  username: String,
  address: String,
  cookieQuantity: Number,
  deliveryStatus: {type: String, default: 'PENDING'},
  assignedTo: String,
  placedOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', OrderSchema, 'order');