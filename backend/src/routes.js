const express = require('express');

const PizzaController = require('./controllers/PizzaController');

const routes = express.Router();

routes.get('/pizza', PizzaController.index);
routes.post('/pizza', PizzaController.create);
routes.delete('/pizza/:id', PizzaController.delete);

module.exports = routes;