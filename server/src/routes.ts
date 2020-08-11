import { Router } from "express";

import authMiddleware from "./app/middlewares/authMiddleware";

import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";
import SubjectController from "./app/controllers/SubjectController";
import HighlightController from "./app/controllers/HighlightController";
import FavoriteBookController from "./app/controllers/FavoriteBookController";
import BooksController from "./app/controllers/BooksController";
import UserSubjectsController from "./app/controllers/UserSubjectsController";
import RecentlySeenController from "./app/controllers/RecentlySeenController";

const routes = Router();

routes.post("/users", UserController.store);
routes.get("/users", authMiddleware, UserController.index);

routes.post("/auth", AuthController.authenticate);

routes.post("/subjects", SubjectController.store);
routes.get("/subjects", SubjectController.index);

routes.post("/highlight", HighlightController.store);
routes.get("/highlight", HighlightController.index);

routes.post("/user_books", BooksController.store); // add JWT verify
routes.get("/user_books", BooksController.index);
routes.delete("/user_books", BooksController.delete);
routes.get("/user_books/list", BooksController.list);
routes.get("/user_books/count", BooksController.count);

routes.patch("/favorite", FavoriteBookController.store); // add JWT verify
routes.get("/favorite", FavoriteBookController.index);
routes.patch("/favorite/remove", FavoriteBookController.delete);
routes.get("/favorite/list", FavoriteBookController.list);

routes.post("/user_subjects", UserSubjectsController.store); // add JWT verify
routes.get("/user_subjects", UserSubjectsController.index);
routes.delete("/user_subjects", UserSubjectsController.delete);
routes.get("/user_subjects/list", UserSubjectsController.list);
routes.get("/user_subjects/count", UserSubjectsController.count);

routes.post("/recently_seen", RecentlySeenController.store);
routes.get("/recently_seen", RecentlySeenController.list);

export default routes;
