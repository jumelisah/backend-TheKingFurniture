const PaymentMethod = require('../models/paymentMethod');

const paymentMethods = async () => {
  const paymentMethod = await PaymentMethod.findAll();

  const seedPayment = [
    {
      name: 'Cash',
      image: null,
    },
  ];
  if (paymentMethod.length === 0) {
    await PaymentMethod.bulkCreate(seedPayment);
  }
};

module.exports = paymentMethods;
