const profile = require('express').Router();

const profileController = require('../controllers/profile');
const { verifyUser } = require('../helpers/auth');

profile.get('/', verifyUser, profileController.getProfile);
// profile.patch('/update', verifyUser, profileController.updateProfile);
profile.patch('/change-password', verifyUser, profileController.changePassword);

module.exports = profile;
