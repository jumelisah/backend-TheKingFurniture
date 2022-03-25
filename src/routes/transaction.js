const transaction = require('express').Router();
const {
  getAllTransaction, addTransaction, updateTransaction, deleteTransaction,
} = require('../controllers/transaction');
const { verifyUser } = require('../helpers/auth');

transaction.get('/', verifyUser, getAllTransaction);
transaction.post('/', verifyUser, addTransaction);
transaction.patch('/', verifyUser, updateTransaction);
transaction.patch('/:id', verifyUser, updateTransaction);
transaction.patch('/delete/:id', verifyUser, deleteTransaction);

module.exports = transaction;
