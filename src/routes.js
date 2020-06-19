const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController');
const UserController = require('./controllers/UserController');
const RepositoryController = require('./controllers/RepositoryController');

const authMiddleware = require('./middlewares/auth');

//Users
routes.get('/user', UserController.index);
//routes.get('/user/:id', authMiddleware, UserController.show);
routes.get('/user/:id', UserController.show);
routes.post('/user', UserController.store);
routes.post('/user/login', UserController.login);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.destroy);

//Products
routes.get('/products', authMiddleware, ProductController.index);
routes.get('/products/:id', authMiddleware, ProductController.show);
routes.post('/products', authMiddleware, ProductController.store);
routes.put('/products/:id', authMiddleware, ProductController.update);
routes.delete('/products/:id', authMiddleware, ProductController.destroy);

//Repositories
routes.get('/repositories', authMiddleware, RepositoryController.index);
routes.get('/repositories/:id', authMiddleware, RepositoryController.show);
routes.post('/repositories', authMiddleware, RepositoryController.store);
routes.post('/repositories/:id/like', authMiddleware, RepositoryController.likeup);
routes.put('/repositories/:id', authMiddleware, RepositoryController.update);
routes.delete('/repositories/:id', authMiddleware, RepositoryController.destroy);



module.exports = routes;