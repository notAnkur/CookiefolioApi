const ObjectId = require('mongoose').Types.ObjectId;
const Delivery = require('../db/Models/Delivery.model');

class DeliveryService {

  async getDeliveryPeople() {
    try {
      const deliveryPeople = await Delivery.find({}).exec();
      return deliveryPeople;
    } catch(error) {
      console.error(error);
    }
  }

  // returns available delivery people or people going in same route
  async getAvailableDeliveryPeople() {
    try {
      const deliveryPeople = await Delivery.find({isAvailable: true}).exec();
      return deliveryPeople;
    } catch(error) {
      console.error(error);
    }
  }

  async assignDelivery(deliveryPersonId, orderId) {
    try {
      const delivery = await Delivery.findOneAndUpdate(
        {_id: ObjectId(deliveryPersonId)},
        {isAvailable: false, $push: { assignedOrderId: orderId }},
        {new: true}
      ).exec();
      return delivery;
    } catch(error) {
      console.error(error);
    }
  }

  async orderDelivered(deliveryPersonId, orderId) {
    try {
      const delivery = await Delivery.findOneAndUpdate(
        {_id: ObjectId(deliveryPersonId)},
        {$pull: { assignedOrderId: ObjectId(orderId) }},
        {new: true}
      ).exec();
      return delivery;
    } catch(error) {
      console.error(error);
    }
  }
}

module.exports = new DeliveryService();