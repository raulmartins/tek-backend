const express = require('express')
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const AuthMiddleware = require('./app/middlewares/auth')
const routes = express.Router()

routes.use(AuthMiddleware)
routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

module.exports = routes
