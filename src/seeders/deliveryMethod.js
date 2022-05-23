const DeliveryMethod = require('../models/deliveryMethod');

const deliveryMethods = async () => {
  const deliveryMethod = await DeliveryMethod.findAll();

  const seedDelivery = [
    { name: 'COD' },
    { name: 'Store Courier' },

  ];
  if (deliveryMethod.length === 0) {
    await DeliveryMethod.bulkCreate(seedDelivery);
  }
};

module.exports = deliveryMethods;
