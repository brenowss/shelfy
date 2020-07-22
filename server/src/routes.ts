import { Router } from "express";

import authMiddleware from './app/middlewares/authMiddleware'

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import SubjectController from './app/controllers/SubjectController';
import HighlightController from './app/controllers/HighlightController';
import BooksController from './app/controllers/BooksController';


const routes = Router();

routes.post('/users', UserController.store);
routes.get('/users', authMiddleware, UserController.index);

routes.post('/auth', AuthController.authenticate);

routes.post('/subjects', SubjectController.store);
routes.get('/subjects', SubjectController.index);

routes.post('/highlight', HighlightController.store);
routes.get('/highlight', HighlightController.index);

routes.post('/user_books', BooksController.store) // add JWT verify
routes.get('/user_books', BooksController.index)
routes.delete('/user_books', BooksController.delete)

export default routes;