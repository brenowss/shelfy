const express = require('express');

const DiscoverController = require('./controllers/DiscoverController');

const routes = express.Router();

routes.get('/discover/highlight', DiscoverController.highlight);
routes.get('/discover/subjects', DiscoverController.subjects);

module.exports = routes;