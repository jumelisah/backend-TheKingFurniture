const favoriteProduct = require('express').Router();
const {
  getFavoriteList, createFavorite, editFavorite, removeFavorite, getFavoriteByProduct,
  getFavoriteByUser,
} = require('../controllers/favoriteProduct');
const { verifyUser } = require('../helpers/auth');

favoriteProduct.get('/', getFavoriteList);
favoriteProduct.get('/product/:id', getFavoriteByProduct);
favoriteProduct.get('/user/', verifyUser, getFavoriteByUser);
favoriteProduct.post('/', verifyUser, createFavorite);
favoriteProduct.patch('/:id', verifyUser, editFavorite);
favoriteProduct.delete('/:id', verifyUser, removeFavorite);

module.exports = favoriteProduct;
