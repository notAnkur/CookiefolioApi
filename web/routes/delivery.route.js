const route = require('express').Router();
const DeliveryService = require('../Services/Delivery.service');
const OrderService = require('../Services/Order.service');
const deliveryStatusType = require('../utils/type');

// get all delivery drivers
route.get('/', async (req, res) => {
  const deliveryPeople = await DeliveryService.getDeliveryPeople();
  res.send(deliveryPeople);
});

// order completion route
route.post('/', async (req, res) => {
  // change delivery person's availability
  let delivery = await DeliveryService.orderDelivered(req.body.deliveryPersonId);
  // change order status
  const order = await OrderService.updateOrder(delivery.assignedOrderId, deliveryStatusType.DELIVERED);
  //assign delivery person to open orders(if any)
  const pendingOrders = await OrderService.getOrders();
  if(pendingOrders.length > 0) {
    await OrderService.updateOrder(pendingOrders[0]._id, deliveryStatusType.ASSIGNED);
    delivery = await DeliveryService.assignDelivery(req.body.deliveryPersonId, pendingOrders[0]._id);
  }

  res.send(delivery);
});

module.exports = route;