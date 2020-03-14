const Order = require('../db/Models/Order.model');
const ObjectId = require('mongoose').Types.ObjectId;

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

    async getOrders() {
      try {
        // find and sort orders in ascending order(oldest to newest)
        const orders = await Order.find({deliveryStatus: 'PENDING'}).sort({placedOn: 1}).exec();
        return orders;
      } catch(error) {
        console.error(error);
      }
    }

    async updateOrder(orderId) {
      try {
        const updatedOrder = await Order.findOneAndUpdate(
          {_id: ObjectId(orderId)},
          {deliveryStatus: 'PENDING'}
        ).exec();
      } catch(error) {
        console.error(error);
      }
    }
}

module.exports = new OrderService();