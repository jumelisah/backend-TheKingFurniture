const Sequelize = require('sequelize');
const sequelize = require('../helpers/sequelize');
const Color = require('./color');
const Product = require('./product');

const ColorProduct = sequelize.define('color_product', {
  id_product: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
  },
  id_color: {
    type: Sequelize.INTEGER,
    references: {
      model: Color,
      key: 'id',
    },
  },
});

module.exports = ColorProduct;
