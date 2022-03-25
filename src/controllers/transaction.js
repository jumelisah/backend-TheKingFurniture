const Transaction = require('../models/transaction');
const responseHandler = require('../helpers/responseHandler');
const Product = require('../models/product');
const TransactionStatus = require('../models/transactionStatus');
const PaymentMethod = require('../models/paymentMethod');
const DeliveryMethod = require('../models/deliveryMethod');

exports.getAllTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findAll({
      where: {
        is_deleted: 0,
      },
    });
    return responseHandler(res, 200, 'List of all transactions', transaction, null);
  } catch (e) {
    return responseHandler(res, 500, 'Error', e, null);
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const product = await Product.findByPk(req.body.id_product);
    if (!product || product.length < 1) {
      return responseHandler(res, 404, 'Product not found');
    }
    const transactionStatus = await TransactionStatus.findByPk(req.body.id_transaction_status);
    if (!transactionStatus) {
      return responseHandler(res, 404, 'Transaction status not found');
    }
    const paymentMethod = await PaymentMethod.findByPk(req.body.id_payment_method);
    if (!paymentMethod) {
      return responseHandler(res, 404, 'Payment method not found');
    }
    const deliveryMethod = await DeliveryMethod.findByPk(req.body.id_delivery_method);
    if (!deliveryMethod) {
      return responseHandler(res, 404, 'Delivery method not found');
    }
    if (req.body.id_transaction_status > 5) {
      return responseHandler(res, 400, 'You haven\'t made any transaction');
    }
    const data = {};
    Object.keys(req.body).forEach((x) => {
      data[x] = req.body[x];
    });
    if (data.qty < 1) {
      return responseHandler(res, 'Quantity should be greater than 0');
    }
    if (product.stock < data.qty) {
      return responseHandler(res, 400, 'Stock limited');
    }
    data.total_price = data.qty * product.price;
    data.id_user = req.user.id;
    const transaction = await Transaction.create(data);
    if (data.id_transaction_status > 1) {
      product.stock -= data.qty;
    }
    await product.save();
    return responseHandler(res, 200, 'Successfully add transaction', transaction, null);
  } catch (e) {
    return responseHandler(res, 400, 'Error', e, null);
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);
    if (!transaction || transaction.dataValues.is_deleted) {
      return responseHandler(res, 404, 'Data not found', null, null);
    }
    const transactionStatus = await TransactionStatus.findByPk(req.body.id_transaction_status);
    if (!transactionStatus) {
      return responseHandler(res, 404, 'Transaction status not found');
    }
    const paymentMethod = await PaymentMethod.findByPk(req.body.id_payment_method);
    if (!paymentMethod) {
      return responseHandler(res, 404, 'Payment method not found');
    }
    const deliveryMethod = await DeliveryMethod.findByPk(req.body.id_delivery_method);
    if (!deliveryMethod) {
      return responseHandler(res, 404, 'Delivery method not found');
    }
    if (transaction.dataValues.id_transaction_status === 6) {
      return responseHandler(res, 400, 'You have been cancelled this transaction');
    }
    const productId = req.body.id_product ? req.body.id_product : transaction.id_product;
    const product = await Product.findByPk(productId);
    if (!product || product.length < 1) {
      return responseHandler(res, 404, 'Product not found');
    }
    const status = transaction.dataValues.id_transaction_status;
    Object.keys(req.body).forEach((x) => {
      transaction[x] = req.body[x];
    });
    transaction.qty = transaction.dataValues.qty;
    transaction.total_price = transaction.qty * product.price;
    transaction.id_user = req.user.id;
    await transaction.save();
    if (status === 1 && transaction.id_transaction_status > 1) {
      product.stock -= transaction.qty;
      await product.save();
    }
    if (status > 1 && transaction.id_transaction_status > 5) {
      product.stock += transaction.qty;
      await product.save();
    }
    return responseHandler(res, 200, 'Transaction was updated', transaction, null);
  } catch (e) {
    return responseHandler(res, 400, 'Error', e, null);
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);
    if (req.user.id !== transaction.id_user) {
      return responseHandler(res, 401, 'You are unable to do this action');
    }
    if (!transaction || transaction.dataValues.is_deleted) {
      return responseHandler(res, 404, 'Data not found', null, null);
    }
    if (transaction.id_transaction_status < 5 || transaction.id_transaction_status < 1) {
      return responseHandler(res, 400, 'You haven\'t finish or cancel your transaction.');
    }
    transaction.is_deleted = 1;
    await transaction.save();
    return responseHandler(res, 200, 'Transaction was deleted', null, null);
  } catch (e) {
    return responseHandler(res, 400, 'Error', e, null);
  }
};
