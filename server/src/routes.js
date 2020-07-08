const express = require('express');

const connection = require('./database/connection');

const DiscoverController = require('./controllers/DiscoverController');
const SubjectController = require('./controllers/SubjectController');

const routes = express.Router();

routes.get('/discover', DiscoverController.index);

routes.get('/subjects', SubjectController.index);

module.exports = routes;