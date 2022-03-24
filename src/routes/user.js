const user = require('express').Router();

const userController = require('../controllers/user');
const { verifyUser, checkIsAdmin } = require('../helpers/auth');

user.get('/', userController.getAllUsers);
user.post('/', verifyUser, checkIsAdmin, userController.createUser);
user.patch('/:id', verifyUser, checkIsAdmin, userController.updateUser);
user.get('/:id', userController.detailUser);
user.patch('/delete/:id', verifyUser, checkIsAdmin, userController.deleteUser);
user.delete('/:id', verifyUser, checkIsAdmin, userController.hardDeleteUser);

module.exports = user;
