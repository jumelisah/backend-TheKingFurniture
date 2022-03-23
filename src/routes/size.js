const size = require('express').Router();

const sizeController = require('../controllers/size');

size.get('/', sizeController.getAllSizes);
size.post('/', sizeController.createSize);
size.patch('/:id', sizeController.updateSize);
size.get('/:id', sizeController.detailSize);
size.delete('/:id', sizeController.deleteSize);

module.exports = size;
