const express = require('express');

const connection = require('./database/connection');

const DiscoverController = require('./controllers/DiscoverController');

const routes = express.Router();

routes.get('/discover', DiscoverController.index);

module.exports = routes;