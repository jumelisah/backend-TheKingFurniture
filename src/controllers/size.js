const Sequelize = require('sequelize');
const responseHandler = require('../helpers/responseHandler');
const Size = require('../models/size');

exports.getAllSizes = async (req, res) => {
  const { search = '' } = req.query;
  const results = await Size.findAll({
    where: {
      name: {
        [Sequelize.Op.like]: `${search}%`,
      },
    },
  });
  return responseHandler(res, 200, 'List all sizes', results);
};

exports.detailSize = async (req, res) => {
  const { id } = req.params;
  const size = await Size.findByPk(id);
  if (size) {
    return responseHandler(res, 200, 'Size detail', size);
  }
  return responseHandler(res, 404, 'Size not found');
};

exports.createSize = async (req, res) => {
  try {
    const size = await Size.create(req.body);
    return responseHandler(res, 201, 'Size created!', size);
  } catch (e) {
    return responseHandler(res, 400, 'error', e.errors.map((err) => ({ field: err.path, message: err.message })));
  }
};

exports.updateSize = async (req, res) => {
  const { id } = req.params;
  const size = await Size.findByPk(id);
  if (size) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        size[key] = req.body[key];
      }
    }
    await size.save();
    return responseHandler(res, 200, 'Size updated!', size);
  }
  return responseHandler(res, 404, 'Size not found!');
};

exports.deleteSize = async (req, res) => {
  const { id } = req.params;
  const size = await Size.findByPk(id);
  if (size) {
    await size.destroy();
    return responseHandler(res, 200, 'Size Deleted!');
  }
  return responseHandler(res, 404, 'Size not found!');
};
