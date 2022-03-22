const Sequelize = require('sequelize');
const responseHandler = require('../helpers/responseHandler');
const Role = require('../models/role');

exports.getAllRoles = async (req, res) => {
  const { search = '' } = req.query;
  const results = await Role.findAll({
    where: {
      name: {
        [Sequelize.Op.like]: `${search}%`,
      },
    },
  });
  return responseHandler(res, 200, 'List all roles', results);
};

exports.detailRole = async (req, res) => {
  const { id } = req.params;
  const role = await Role.findByPk(id);
  if (role) {
    return responseHandler(res, 200, 'Role detail', role);
  }
  return responseHandler(res, 404, 'Role not found');
};

exports.createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    return responseHandler(res, 201, 'Role created!', role);
  } catch (e) {
    return responseHandler(res, 400, 'error', e.errors.map((err) => ({ field: err.path, message: err.message })));
  }
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const role = await Role.findByPk(id);
  if (role) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        role[key] = req.body[key];
      }
    }
    await role.save();
    return responseHandler(res, 200, 'Role updated!', role);
  }
  return responseHandler(res, 404, 'Role not found!');
};

exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  const role = await Role.findByPk(id);
  if (role) {
    await role.destroy();
    return responseHandler(res, 200, 'Role Deleted!');
  }
  return responseHandler(res, 404, 'Role not found!');
};
