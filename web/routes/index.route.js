const route = require('express').Router();

route.get('/', (req, res) => {
  res.render('index.ejs', {
      ip: `http://localhost:8006`,
      endpoints: [
          {
              method: 'GET',
              endpoint: 'order',
              desc: 'Endpoint to fetch pending orders',
              reqBody: 'None',
              response: 'Array of pending orders in ascending order.'
          },
          {
              method: 'POST',
              endpoint: 'order',
              desc: 'Endpoint to place new order',
              reqBody: 'username, address, cookieQuantity',
              response: '\"newOrder\": {deliveryStatus, _id, username, address, cookieQuantity, placedOn}'
          },
          {
              method: 'POST',
              endpoint: 'order/:id',
              desc: 'Endpoint to update order status',
              reqBody: 'order id(mongo document id) as request param',
              response: ''
          }
      ]
  });
});

module.exports = route;
