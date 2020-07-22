import { Request, Response } from "express";

import { getRepository } from "typeorm";

import UsersBooks from "../models/UsersBooks";
import User from "../models/User";

class BooksController {
  async index(req: Request, res: Response) {
    const repository = getRepository(UsersBooks);
    const { user_id: userId } = req.body;

    const user_books = await repository.find({ where: { user_id: userId } });
    return res.send({ user_books });
  }

  async store(req: Request, res: Response) {
    const UsersBooksRepository = getRepository(UsersBooks);
    const UserRepository = getRepository(User);
    const { user_id, book_id } = req.body;

    const userExists = await UserRepository.findOne({ where: { id: user_id } });

    if (!userExists) return res.sendStatus(400);

    const user_book = UsersBooksRepository.create({ user_id, book_id });
    await UsersBooksRepository.save(user_book);

    return res.json(user_book);
  }

  async delete(req: Request, res: Response) {
    const UsersBooksRepository = getRepository(UsersBooks);
    const UserRepository = getRepository(User);
    const { user_id, book_id } = req.body;

    const userExists = await UserRepository.findOne({ where: { id: user_id } });

    if (!userExists) {
      return res.sendStatus(400);
    }

    const user_book = await UsersBooksRepository.findOne({ user_id, book_id });

    if (!user_book) {
      return res.sendStatus(400);
    }
    await UsersBooksRepository.remove(user_book);

    return res.json({ user_book, action: "removed" });
  }
}

export default new BooksController();
