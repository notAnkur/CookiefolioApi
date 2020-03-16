const route = require('express').Router();

route.get('/', (req, res) => {
  res.render('index.ejs', {
      ip: `https://api.cookiefolio.ankuranant.dev`,
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
              response: 'string deliveryStatus, string _id, string username, string address, int cookieQuantity, dateString placedOn, string assignedTo'
          },
          {
              method: 'GET',
              endpoint: 'delivery',
              desc: 'Endpoint to fetch all delivery drivers',
              reqBody: 'None',
              response: 'Array of drivers - string assignedOrderId, string _id, string username, bool isAvailable'

          },
          {
              method: 'POST',
              endpoint: 'delivery',
              desc: 'Order finished endpoint',
              reqBody: 'deliveryPersonId',
              response: 'string assignedOrderId, string _id, string username, bool isAvailable'

          }
      ]
  });
});

module.exports = route;
