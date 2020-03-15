const ObjectId = require('mongoose').Types.ObjectId;
const Order = require('../db/Models/Order.model');

class OrderService {
    async newOrder(order) {
      try {
        const newOrder = new Order({ ...order });
        newOrder.save();
        return newOrder;
      } catch(error) {
        console.error(error);
      }
    }

    // returns PENDING orders
    async getOrders() {
      try {
        // find and sort orders in ascending order(oldest to newest)
        const orders = await Order.find({deliveryStatus: 'PENDING'}).sort({placedOn: 1}).exec();
        return orders;
      } catch(error) {
        console.error(error);
      }
    }

    async updateOrder(orderId, status) {
      try {
        const updatedOrder = await Order.findOneAndUpdate(
          {_id: ObjectId(orderId)},
          {deliveryStatus: status},
          {new: true}
        ).exec();
        console.log(updatedOrder)
        return updatedOrder;
      } catch(error) {
        console.error(error);
      }
    }
}

module.exports = new OrderService();