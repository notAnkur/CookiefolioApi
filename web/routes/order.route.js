const route = require('express').Router();
const jwt = require('jsonwebtoken');
const OrderService = require('../Services/Order.service');
const DeliveryService = require('../Services/Delivery.service');
const deliveryStatusType = require('../utils/type');
const { verifyToken } = require('../utils/verifyToken');

route.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, result) => {
    if(err) console.error(err);
    if(result && result.accessLevel>=3) {
      const orders = await OrderService.getOrders();
      res.status(200).json({orders, isOpSuccess: true, message: "Fetched orders successfully"});
    } else {
      res.status(401).json({orders: null, isOpSuccess: false, message: "Invalid token"});
    }
  });
});

route.post('/', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, result) => {
    if(err) console.error(err);
    if(result && result.accessLevel>=2) {
      const deliveryPeople = await DeliveryService.getAvailableDeliveryPeople();

      const driverId = await OrderService.locationCheck(req.body.address);
      console.log(driverId)

      let newOrderObj = {
        username: req.body.username,
        address: req.body.address,
        cookieQuantity: req.body.cookieQuantity,
        deliveryStatus: deliveryPeople.length == 0 ? deliveryStatusType.PENDING : deliveryStatusType.ASSIGNED,
        assignedTo: deliveryPeople.length == 0 ? driverId : deliveryPeople[0]._id
      };

      const order = await OrderService.newOrder({...newOrderObj});

      if(deliveryPeople.length > 0) {
        // delivery person is available, change their availability status
        DeliveryService.assignDelivery(deliveryPeople[0]._id, order._id);
      } else if(driverId != null) {
        DeliveryService.assignDelivery(driverId, order._id);
      }
      res.status(200).json({order, isOpSuccess: true, message: "Order placed successfully"});
    } else {
      res.status(401).json({order: null, isOpSuccess: false, message: "Invalid jwt token"});
    }
  });
});

route.get('/pending', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, result) => {
    if(err) console.error(err);
    if(result && result.accessLevel>=2) {
      const orders = await OrderService.getPendingOrders();
      res.status(200).json({orders, isOpSuccess: true, message: "Fetched orders successfully"});
    } else {
      res.status(401).json({orders: null, isOpSuccess: false, message: "Invalid token"});
    }
  });
});

route.get('/me', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, result) => {
    if(err) console.error(err);
    if(result && result.accessLevel>=1) {
      const orders = await OrderService.getMyPendingOrder(result.username);
      res.status(200).json({orders, isOpSuccess: true, message: "Fetched user\'s orders successfully"});
    } else {
      res.status(401).json({orders: null, isOpSuccess: false, message: "Invalid token"});
    }
  });
});

route.get('/me/all', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, result) => {
    if(err) console.error(err);
    if(result && result.accessLevel>=1) {
      const orders = await OrderService.getMyOrders(result.username);
      res.status(200).json({orders, isOpSuccess: true, message: "Fetched user\'s orders successfully"});
    } else {
      res.status(401).json({isOpSuccess: false, message: "Invalid token"});
    }
  });
});

module.exports = route;