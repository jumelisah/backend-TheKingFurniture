const Sequelize = require('sequelize');
const sequelize = require('../helpers/sequelize');
const User = require('./user');
const Product = require('./product');

const Review = sequelize.define('review', {
  id_user: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: {
        msg: 'Invalid id_user format',
      },
      min: 0,
    },
  },
  id_product: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: {
        msg: 'Invalid id_product format',
      },
      min: 0,
    },
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Content cannot be null!',
      },
      notEmpty: {
        msg: 'Content cannot be empty!',
      },
    },
  },
  id_parent: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: {
        msg: 'Invalid id_parent format',
      },
      min: 0,
    },
  },
});

Review.belongsTo(User, {
  foreignKey: {
    name: 'id_user',
    allowNull: false,
  },
});
Review.belongsTo(Product, {
  foreignKey: {
    name: 'id_product',
    allowNull: false,
  },
});

Review.belongsTo(Review, {
  as: 'Reply',
  foreignKey: {
    name: 'id_parent',
    // as: 'Reply',
  },
});

module.exports = Review;
