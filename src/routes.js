const express = require('express')
const controllers = require('./app/controllers')

const AuthMiddleware = require('./app/middlewares/auth')
const routes = express.Router()

routes.post('/users', controllers.UserController.store)
routes.post('/sessions', controllers.SessionController.store)

routes.use(AuthMiddleware)

routes.get('/project', controllers.ProjectController.index)
routes.get('/project/:id', controllers.ProjectController.show)
routes.post('/project', controllers.ProjectController.store)
routes.put('/project/:id', controllers.ProjectController.update)
routes.delete('/project/:id', controllers.ProjectController.destroy)
routes.post('/project/health/:id', controllers.ProjectController.health)

module.exports = routes
