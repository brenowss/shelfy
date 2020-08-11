import { Request, Response } from "express";

import { getRepository, getConnection } from "typeorm";

import User from "../models/User";

class FavoriteBooksController {
  async list(req: Request, res: Response) {
    const repository = getRepository(User);
    const { user_id } = req.query;

    const favorite = await repository.findOne({ where: { id: user_id } });
    return res.send({ favorite });
  }

  async index(req: Request, res: Response) {
    const repository = getRepository(User);
    const { user_id, book_id } = req.query;

    const liked_book = await repository.findOne({
      where: { user_id, book_id },
    });

    if (!liked_book) {
      return res.sendStatus(204);
    } else {
      return res.sendStatus(200);
    }
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(User);
    const { user_id, book_id } = req.body;

    const userExists = await repository.findOne({ where: { id: user_id } });

    if (!userExists) return res.sendStatus(400);

    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ favorite_book: book_id })
        .where("id = :id", { id: user_id })
        .execute();
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    return res.sendStatus(200);
  }

  async delete(req: Request, res: Response) {
    const repository = getRepository(User);
    const { user_id } = req.body;

    const userExists = await repository.findOne({ where: { id: user_id } });

    if (!userExists) return res.sendStatus(400);

    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ favorite_book: 'NULL' })
        .where("id = :id", { id: user_id })
        .execute();
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    return res.sendStatus(200);
  }
}

export default new FavoriteBooksController();
