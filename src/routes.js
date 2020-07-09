const express = require('express');
const routes = express.Router();

const ProductController = require('./app/controllers/ProductController');
const UserController = require('./app/controllers/UserController');
const RepositoryController = require('./app/controllers/RepositoryController');
const ProjectController = require("./app/controllers/ProjectController");

require('../src/app/controllers/index');

const authMiddleware = require('./app/middlewares/auth');

//Users
routes.get('/user', UserController.index);
routes.get('/user/pages', UserController.pages);
routes.get('/user/:id', UserController.show);
routes.post('/user', UserController.store);
routes.post('/user/login', UserController.login);
routes.post('/user/forgot_password', UserController.forgot);
routes.post('/user/reset_password', UserController.reset);
routes.patch('/user/avatar/:id/:email', UserController.avatar);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.destroy);

//Products
routes.get('/products', authMiddleware, ProductController.index);
routes.get('/products/pages', authMiddleware, ProductController.pages);
routes.get('/products/:id', authMiddleware, ProductController.show);
routes.post('/products', authMiddleware, ProductController.store);
routes.put('/products/:id', authMiddleware, ProductController.update);
routes.delete('/products/:id', authMiddleware, ProductController.destroy);

//Repositories
routes.get('/repositories', RepositoryController.index);
routes.get('/repositories/:id', RepositoryController.show);
routes.post('/repositories', RepositoryController.store);
routes.post('/repositories/:id/like', RepositoryController.likeup);
routes.put('/repositories/:id', RepositoryController.update);
routes.delete('/repositories/:id', RepositoryController.destroy);

//Project
routes.get('/projects', authMiddleware, ProjectController.index);
routes.get('/projects/:id', authMiddleware, ProjectController.show);
routes.post('/projects', authMiddleware, ProjectController.store);
routes.put('/projects/:id', authMiddleware, ProjectController.update);
routes.delete('/projects/:id', authMiddleware, ProjectController.destroy);

module.exports = routes;