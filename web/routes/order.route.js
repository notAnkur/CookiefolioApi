const route = require('express').Router();
const OrderService = require('../Services/Order.service');
const DeliveryService = require('../Services/Delivery.service');
const deliveryStatusType = require('../utils/type');

route.get('/', async (req, res) => {
  const orders = await OrderService.getOrders();
  console.log(orders);
});

route.post('/', async (req, res) => {

  const deliveryPeople = await DeliveryService.getDeliveryPeople();

  let newOrderObj = {
    username: req.body.username,
    address: req.body.address,
    cookieQuantity: req.body.cookieQuantity,
    deliveryStatus: deliveryPeople.length==0 ? deliveryStatusType.PENDING : deliveryStatusType.ASSIGNED,
    assignedTo: deliveryPeople.length==0 ? null : deliveryPeople[0]._id
  };

  const order = await OrderService.newOrder({...newOrderObj});

  if(deliveryPeople.length > 0) {
    // delivery person is available, change their availability status
    DeliveryService.assignDelivery(deliveryPeople[0]._id, order._id);
  }

  res.json({order});
});

route.post('/:id', async (req, res) => {
  
});

module.exports = route;