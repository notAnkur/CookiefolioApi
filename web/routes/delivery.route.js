const route = require('express').Router();
const jwt = require('jsonwebtoken');
const DeliveryService = require('../Services/Delivery.service');
const OrderService = require('../Services/Order.service');
const deliveryStatusType = require('../utils/type');

const { verifyToken } = require('../utils/verifyToken');

// get all delivery drivers
route.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, result) => {
    if(err) console.error(err);
    if(result && result.accessLevel>=3) {
      const deliveryPeople = await DeliveryService.getDeliveryPeople();
      res.status(200).json({deliveryPeople, isOpSuccess: true, message: "Successfully fetched all delivery drivers"});
    } else {
      res.status(401).json({deliveryPeople: null, isOpSuccess: false, message: "Invalid token"});
    }
  });
});

// order completion route
route.post('/', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, result) => {
    if(err) console.error(err);
    if(result && result.accessLevel>=2) {
      // change delivery person's availability
      let delivery = await DeliveryService.orderDelivered(req.body.deliveryPersonId, req.body.orderId);
      // change order status
      const order = await OrderService.updateOrder(req.body.orderId, deliveryStatusType.DELIVERED);
      //assign delivery person to open orders(if any)
      const pendingOrders = await OrderService.getPendingOrders();
      if(pendingOrders.length > 0) {
        await OrderService.updateOrder(pendingOrders[0]._id, deliveryStatusType.ASSIGNED);
        delivery = await DeliveryService.assignDelivery(req.body.deliveryPersonId, pendingOrders[0]._id);
      }
      res.status(200).json({delivery, isOpSuccess: false, message: "Invalid token"});
    } else {
      res.status(401).json({delivery: null, isOpSuccess: false, message: "Invalid token"});
    }
  });
});

module.exports = route;