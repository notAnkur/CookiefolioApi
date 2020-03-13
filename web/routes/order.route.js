const route = require('express').Router();

route.get('/', (req, res) => {
  console.log('order GET');
  res.send("Order GET");
});

module.exports = route;