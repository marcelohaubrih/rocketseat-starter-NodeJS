const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController');
const UserController = require('./controllers/UserController');
const RepositoryController = require('./controllers/RepositoryController');


//Users
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.post('/user', UserController.store);
routes.post('/user/login', UserController.login);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.destroy);

//Products
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

//Repositories
routes.get('/repositories', RepositoryController.index);
routes.get('/repositories/:id', RepositoryController.show);
routes.post('/repositories', RepositoryController.store);
routes.post('/repositories/:id/like', RepositoryController.likeup);
routes.put('/repositories/:id', RepositoryController.update);
routes.delete('/repositories/:id', RepositoryController.destroy);



module.exports = routes;