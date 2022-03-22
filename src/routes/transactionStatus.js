const transactionStatus = require('express').Router();

const transactionStatusController = require('../controllers/transactionStatus');

transactionStatus.get('/', transactionStatusController.getAllTransactionStatus);
transactionStatus.post('/', transactionStatusController.createTransactionStatus);
transactionStatus.patch('/:id', transactionStatusController.updateTransactionStatus);
transactionStatus.get('/:id', transactionStatusController.detailTransactionStatus);
transactionStatus.delete('/:id', transactionStatusController.deleteTransactionStatus);

module.exports = transactionStatus;
