const routes = require('express').Router();
const responseHandler = require('../helpers/responseHandler');

routes.use('/auth', require('./auth'));
routes.use('/product', require('./product'));
routes.use('/category', require('./category'));
routes.use('/role', require('./role'));
routes.use('/size', require('./size'));
routes.use('/transaction-status', require('./transactionStatus'));
routes.use('/product', require('./product'));
routes.use('/category', require('./category'));
routes.use('/product-category', require('./productCategory'));
routes.use('/delivery-method', require('./deliveryMethod'));
routes.use('/user', require('./user'));
routes.use('/product-category', require('./productCategory'));
routes.use('/delivery-method', require('./deliveryMethod'));
routes.use('/profile', require('./profile'));

routes.get('/', (req, res) => responseHandler(res, 200, 'Backend is running well!'));

module.exports = routes;
