const ObjectId = require('mongoose').Types.ObjectId;
const Delivery = require('../db/Models/Delivery.model');

class DeliveryService {

  async getDeliveryPeople() {
    try {
      const deliveryPeople = await Delivery.find({isAvailable: true}).exec();
      return deliveryPeople;
    } catch(error) {
      console.error(error);
    }
  }

  async assignDelivery(deliveryPersonId) {
    try {
      const delivery = await Delivery.findOneAndUpdate(
        {_id: ObjectId(deliveryPersonId)},
        {isAvailable: false}
      ).exec();
    } catch(error) {
      console.error(error);
    }
  }
}

module.exports = new DeliveryService();