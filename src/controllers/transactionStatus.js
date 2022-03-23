const Sequelize = require('sequelize');
const responseHandler = require('../helpers/responseHandler');
const TransactionStatus = require('../models/transactionStatus');

exports.getAllTransactionStatus = async (req, res) => {
  const { search = '' } = req.query;
  const results = await TransactionStatus.findAll({
    where: {
      name: {
        [Sequelize.Op.like]: `${search}%`,
      },
    },
  });
  return responseHandler(res, 200, 'List all transaction status', results);
};

exports.detailTransactionStatus = async (req, res) => {
  const { id } = req.params;
  const transactionStatus = await TransactionStatus.findByPk(id);
  if (transactionStatus) {
    return responseHandler(res, 200, 'Transaction Status detail', transactionStatus);
  }
  return responseHandler(res, 404, 'Transaction Status not found');
};

exports.createTransactionStatus = async (req, res) => {
  try {
    const transactionStatus = await TransactionStatus.create(req.body);
    return responseHandler(res, 201, 'Transaction Status created!', transactionStatus);
  } catch (e) {
    return responseHandler(res, 400, 'error', e.errors.map((err) => ({ field: err.path, message: err.message })));
  }
};

exports.updateTransactionStatus = async (req, res) => {
  const { id } = req.params;
  const transactionStatus = await TransactionStatus.findByPk(id);
  if (transactionStatus) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        transactionStatus[key] = req.body[key];
      }
    }
    await transactionStatus.save();
    return responseHandler(res, 200, 'Transaction Status updated!', transactionStatus);
  }
  return responseHandler(res, 404, 'Transaction Status not found!');
};

exports.deleteTransactionStatus = async (req, res) => {
  const { id } = req.params;
  const transactionStatus = await TransactionStatus.findByPk(id);
  if (transactionStatus) {
    await transactionStatus.destroy();
    return responseHandler(res, 200, 'Transaction Status Deleted!');
  }
  return responseHandler(res, 404, 'Transaction Status not found!');
};
