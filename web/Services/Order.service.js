const ObjectId = require('mongoose').Types.ObjectId;
const Order = require('../db/Models/Order.model');
const deliveryType = require('../utils/type');

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

    // returns all orders
    async getOrders() {
      try {
        const orders = await Order.find({}).exec();
        return orders;
      } catch(error) {
        console.error(error);
      }
    }

    // returns PENDING orders
    async getPendingOrders() {
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
        return updatedOrder;
      } catch(error) {
        console.error(error);
      }
    }

    // returns user's unfinished orders
    async getMyPendingOrder(username) {
      try {
        console.log(username)
        const orders = await Order.find({username: new RegExp(`^${username}$`, 'i'), $or: [
          {deliveryStatus: deliveryType.ASSIGNED},
          {deliveryStatus: deliveryType.PENDING}
        ]}).exec();
        console.log(orders)
        return orders;
      } catch(error) {
        console.error(error);
      }
    }

    // return user's orders
    async getMyOrders(username) {
      try {
        const orders = await Order.find({username: new RegExp(`^${username}$`, 'i')}).exec();
        return orders;
      } catch(error) {
        console.error(error);
      }
    }
}

module.exports = new OrderService();