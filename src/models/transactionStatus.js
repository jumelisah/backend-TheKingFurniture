const Sequelize = require('sequelize');
const sequelize = require('../helpers/sequelize');

const TransactionStatus = sequelize.define('transaction_status', {
  name: {
    type: Sequelize.STRING,
    unique: {
      msg: 'Transaction Status already exist',
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

module.exports = TransactionStatus;
