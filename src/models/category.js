const Sequelize = require('sequelize');
const sequelize = require('../helpers/sequelize');

const Category = sequelize.define('category', {
  name: {
    type: Sequelize.STRING,
    unique: {
      msg: 'Category already exist',
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Name cannot be null!',
      },
      notEmpty: {
        msg: 'Name cannot be empty!',
      },
    },
  },
});

module.exports = Category;
