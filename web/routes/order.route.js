const route = require('express').Router();
const OrderService = require('../Services/Order.service');
const DeliveryService = require('../Services/Delivery.service');

route.get('/', async (req, res) => {
  const orders = await OrderService.getOrders();
  console.log(orders);
});

route.post('/', async (req, res) => {
  console.log('order POST');
  const deliveryPeople = await DeliveryService.getDeliveryPeople();
  console.log(deliveryPeople);
  let newOrderObj = {
    username: req.body.username,
    address: req.body.address,
    cookieQuantity: req.body.cookieQuantity,
    deliveryStatus: null,
    assignedTo: null
  };

  if(deliveryPeople.length == 0) {
    newOrderObj.deliveryStatus = 'PENDING';
  } else if(deliveryPeople.length > 0) {
    newOrderObj.deliveryStatus = 'ASSIGNED';
    newOrderObj.assignedTo = deliveryPeople[0]._id;
    // change delivery person's availability
    DeliveryService.assignDelivery(deliveryPeople[0]._id);
  }

  const order = await OrderService.newOrder({...newOrderObj});
  res.json({order});
})

module.exports = route;