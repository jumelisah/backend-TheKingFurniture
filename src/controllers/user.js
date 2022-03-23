const Sequelize = require('sequelize');
const responseHandler = require('../helpers/responseHandler');
const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
  try {
    const { search = '' } = req.query;
    const results = await User.findAll({
      where: {
        is_deleted: false,
        name: {
          [Sequelize.Op.like]: `${search}%`,
        },
      },
    });
    return responseHandler(res, 200, 'List all users', results);
  } catch (e) {
    return responseHandler(res, 400, 'error', e);
  }
};

exports.detailUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (user) {
    return responseHandler(res, 200, 'User detail', user);
  }
  return responseHandler(res, 404, 'User not found');
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return responseHandler(res, 201, 'User created!', user);
  } catch (e) {
    let error = e.message;
    if (Array.isArray(e.errors)) {
      error = e.errors.map((err) => ({ field: err.path, message: err.message }));
    }
    return responseHandler(res, 400, 'error', error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in req.body) {
        if (Object.prototype.hasOwnProperty.call(req.body, key)) {
          user[key] = req.body[key];
        }
      }
      await user.save();
      return responseHandler(res, 200, 'User updated!', user);
    }
    return responseHandler(res, 404, 'User not found!');
  } catch (e) {
    let error = e.message;
    if (Array.isArray(e.errors)) {
      error = e.errors.map((err) => ({ field: err.path, message: err.message }));
    }
    return responseHandler(res, 400, 'error', error);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    return responseHandler(res, 200, 'User Deleted!');
  }
  return responseHandler(res, 404, 'User not found!');
};
