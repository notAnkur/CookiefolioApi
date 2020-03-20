const ObjectId = require('mongoose').Types.ObjectId;
const Order = require('../db/Models/Order.model');
const Delivery = require('../db/Models/Delivery.model');
const deliveryType = require('../utils/type');
const {fakeMap} = require('../utils/fakeMap');

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

    // returns driver's ID going in the same direction
    async locationCheck(orderAddress) {
      try {
        const deliveryGuys = await Delivery.find({}).exec();
        if(fakeMap()) {
          const randomIndex = Math.floor(Math.random() * (deliveryGuys.length - 0 + 1) + 0);
          return deliveryGuys[randomIndex]===undefined ? null : deliveryGuys[randomIndex]._id;
        } else {
          return null;
        }
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