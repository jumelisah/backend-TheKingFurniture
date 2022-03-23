const user = require('express').Router();

const userController = require('../controllers/user');

user.get('/', userController.getAllUsers);
user.post('/', userController.createUser);
user.patch('/:id', userController.updateUser);
user.get('/:id', userController.detailUser);
user.delete('/:id', userController.deleteUser);

module.exports = user;
