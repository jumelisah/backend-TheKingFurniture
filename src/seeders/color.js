const Color = require('../models/color');

const colors = async () => {
  const color = await Color.findAll();

  const seedColor = [
    {
      name: 'Black',
      code: '#000000',
    },
  ];
  if (color.length === 0) {
    await Color.bulkCreate(seedColor);
  }
};

module.exports = colors;
