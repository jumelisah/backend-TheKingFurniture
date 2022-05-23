const DeliveryMethod = require('../models/deliveryMethod');

const deliveryMethods = async () => {
  const deliveryMethod = await DeliveryMethod.findAll();

  const seedColor = [
    {
      name: 'COD',
    },
  ];
  if (deliveryMethod.length === 0) {
    await DeliveryMethod.bulkCreate(seedColor);
  }
};

module.exports = deliveryMethods;
