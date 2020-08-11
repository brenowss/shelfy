import { Request, Response } from "express";

import { getRepository, getConnection } from "typeorm";

import RecentlySeen from "../models/RecentlySeen";
import User from "../models/User";

class RecentlySeenController {
  async list(req: Request, res: Response) {
    const repository = getRepository(RecentlySeen);
    const { user_id } = req.query;

    const recently_seen = await repository.find({
      where: { user_id },
      order: { id: "DESC" },
    });
    return res.send({ recently_seen });
  }

  async store(req: Request, res: Response) {
    const RecentlySeenRepository = getRepository(RecentlySeen);
    const UserRepository = getRepository(User);
    const { user_id, book_id } = req.body;

    const userExists = await UserRepository.findOne({ where: { id: user_id } });

    if (!userExists) return res.sendStatus(400);

    const count = await RecentlySeenRepository.count({
      where: { user_id },
    });

    if (count >= 8) {
      const oldest_seen = await RecentlySeenRepository.findOne({
        where: { user_id },
        order: { id: "ASC" },
      });

      if (!oldest_seen) {
        return res.sendStatus(500);
      }
      await RecentlySeenRepository.remove(oldest_seen);
    }

    const seenExists = await RecentlySeenRepository.findOne({ where: { user_id, book_id } })

    if (seenExists) return;

    const recently_seen = RecentlySeenRepository.create({ user_id, book_id });
    await RecentlySeenRepository.save(recently_seen);

    return res.sendStatus(200);
  }
}

export default new RecentlySeenController();
