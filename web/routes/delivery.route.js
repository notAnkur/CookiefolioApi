const route = require('express').Router();
const DeliveryService = require('../Services/Delivery.service');
const OrderService = require('../Services/Order.service');
const deliveryStatusType = require('../utils/type');

// order completion route
route.post('/', async (req, res) => {
  const delivery = await DeliveryService.orderDelivered(req.body.deliveryPersonId);
  // console.log(order)
  const order = await OrderService.updateOrder(delivery.assignedOrderId, deliveryStatusType.DELIVERED);
  // console.log(order);
  res.json({order});
});

module.exports = route;