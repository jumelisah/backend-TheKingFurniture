const Sequelize = require('sequelize');
const sequelize = require('../helpers/sequelize');

const Size = sequelize.define('size', {
  name: {
    type: Sequelize.STRING,
    unique: {
      msg: 'Size already exist',
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
  label: {
    type: Sequelize.STRING,
    unique: {
      msg: 'Label has already used',
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Label cannot be null!',
      },
      notEmpty: {
        msg: 'Label cannot be empty!',
      },
    },
  },
});

module.exports = Size;
