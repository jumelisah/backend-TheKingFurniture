const transaction = require('express').Router();
const {
  getAllTransaction, addTransaction, updateTransaction, deleteTransaction, getTransactionByUser,
  getUserCart,
} = require('../controllers/transaction');
const { verifyUser, checkIsAdmin } = require('../helpers/auth');

transaction.get('/', verifyUser, checkIsAdmin, getAllTransaction);
transaction.get('/user', verifyUser, getTransactionByUser);
transaction.get('/cart', verifyUser, getUserCart);
transaction.post('/', verifyUser, addTransaction);
transaction.patch('/', verifyUser, updateTransaction);
transaction.patch('/:id', verifyUser, updateTransaction);
transaction.patch('/delete/:id', verifyUser, deleteTransaction);

module.exports = transaction;
