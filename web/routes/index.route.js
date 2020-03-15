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
              response: 'Array of pending orders in ascending order(oldest to newest).'
          },
          {
              method: 'POST',
              endpoint: 'order',
              desc: 'Endpoint to place new order',
              reqBody: 'username, address, cookieQuantity',
              response: '\"newOrder\": {string deliveryStatus, string _id, string username, string address, int cookieQuantity, dateString placedOn}'
          },
          {
              method: 'POST',
              endpoint: 'delivery',
              desc: 'Order finished endpoint',
              reqBody: 'deliveryPersonId',
              response: '\"order\": {string _id, string username, string address, int cookieQuantity, string deliveryStatus, string assignedTo, string placedOn}'

          }
      ]
  });
});

module.exports = route;
