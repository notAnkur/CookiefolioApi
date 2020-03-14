const Order = require('../db/Models/Order.model');

class OrderService {
    async newOrder(order) {
      try {
        const newOrder = new Order({ ...order });
        newOrder.save();
        console.log(newOrder);
        return newOrder;
      } catch(error) {
        console.error(error);
      }
    }
}

module.exports = new OrderService();