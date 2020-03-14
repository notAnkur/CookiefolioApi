const route = require('express').Router();
const OrderService = require('../Services/Order.service');

route.get('/', (req, res) => {
  console.log('order GET');
  res.send("Order GET");
});

route.post('/', async (req, res) => {
  console.log('order POST');
  const reqBody = req.body;
  const newOrder = await OrderService.newOrder({
    username: reqBody.username, 
    address: reqBody.address, 
    cookieQuantity: reqBody.cookieQuantity
  });
  res.json({newOrder});
})

module.exports = route;