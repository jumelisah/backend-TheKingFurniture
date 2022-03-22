const Sequelize = require('sequelize');
const sequelize = require('../helpers/sequelize');

const Role = sequelize.define('role', {
  name: {
    type: Sequelize.STRING,
    unique: {
      msg: 'Role already exist',
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

module.exports = Role;
