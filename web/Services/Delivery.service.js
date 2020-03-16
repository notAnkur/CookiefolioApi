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

  // returns available delivery people
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
        {isAvailable: false, assignedOrderId: orderId},
        {new: true}
      ).exec();
      return delivery;
    } catch(error) {
      console.error(error);
    }
  }

  async orderDelivered(deliveryPersonId) {
    try {
      const delivery = await Delivery.findOneAndUpdate(
        {_id: ObjectId(deliveryPersonId)},
        {isAvailable: true, assignedOrderId: null}
      ).exec();
      return delivery;
    } catch(error) {
      console.error(error);
    }
  }
}

module.exports = new DeliveryService();