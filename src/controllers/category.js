const Sequelize = require('sequelize');
const responseHandler = require('../helpers/responseHandler');
const Category = require('../models/category');

exports.getAllCategories = async (req, res) => {
  const { search = '' } = req.query;
  const results = await Category.findAll({
    where: {
      name: {
        [Sequelize.Op.like]: `${search}%`,
      },
    },
  });
  return responseHandler(res, 200, 'List all categories', results);
};

exports.detailCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (category) {
    return responseHandler(res, 200, 'Category detail', category);
  }
  return responseHandler(res, 404, 'Category not found');
};

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return responseHandler(res, 201, 'Category created!', category);
  } catch (e) {
    return responseHandler(res, 400, 'error', e.errors.map((err) => ({ field: err.path, message: err.message })));
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (category) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        category[key] = req.body[key];
      }
    }
    await category.save();
    return responseHandler(res, 200, 'Category updated!', category);
  }
  return responseHandler(res, 404, 'Category not found!');
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (category) {
    await category.destroy();
    return responseHandler(res, 200, 'Category Deleted!');
  }
  return responseHandler(res, 404, 'Category not found!');
};
