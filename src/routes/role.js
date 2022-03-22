const role = require('express').Router();

const roleController = require('../controllers/role');

role.get('/', roleController.getAllRoles);
role.post('/', roleController.createRole);
role.patch('/:id', roleController.updateRole);
role.get('/:id', roleController.detailRole);
role.delete('/:id', roleController.deleteRole);

module.exports = role;
