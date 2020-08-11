import { Request, Response } from "express";

import { getRepository } from "typeorm";

import UsersSubjects from "../models/UsersSubjects";
import User from "../models/User";

class UserSubjectsController {
  async list(req: Request, res: Response) {
    const repository = getRepository(UsersSubjects);
    const { user_id } = req.query;

    const user_subjects = await repository.find({
      where: { user_id },
      order: { id: "DESC" },
    });
    return res.send({ user_subjects });
  }

  async index(req: Request, res: Response) {
    const repository = getRepository(UsersSubjects);
    const { user_id, subject } = req.query;

    const liked_subject = await repository.findOne({
      where: { user_id, subject },
    });

    if (!liked_subject) {
      return res.sendStatus(204);
    } else {
      return res.sendStatus(200);
    }
  }

  async store(req: Request, res: Response) {
    const UsersSubjectsRepository = getRepository(UsersSubjects);
    const UserRepository = getRepository(User);
    const { user_id, subject } = req.body;

    const userExists = await UserRepository.findOne({ where: { id: user_id } });

    if (!userExists) return res.sendStatus(400);

    const user_subject = UsersSubjectsRepository.create({ user_id, subject });
    await UsersSubjectsRepository.save(user_subject);

    return res.json(user_subject);
  }

  async delete(req: Request, res: Response) {
    const UsersSubjectsRepository = getRepository(UsersSubjects);
    const UserRepository = getRepository(User);
    const { user_id, subject } = req.query;

    const userExists = await UserRepository.findOne({ where: { id: user_id } });

    if (!userExists) {
      return res.sendStatus(404);
    }

    const user_subject = await UsersSubjectsRepository.findOne({
      where: { user_id, subject },
    });

    if (!user_subject) {
      return res.sendStatus(400);
    }
    await UsersSubjectsRepository.remove(user_subject);

    return res.sendStatus(200);
  }

  async count(req: Request, res: Response) {
    const UsersSubjectsRepository = getRepository(UsersSubjects);
    const UserRepository = getRepository(User);
    const { user_id } = req.query;

    const userExists = await UserRepository.findOne({ where: { id: user_id } });

    if (!userExists) {
      return res.sendStatus(404);
    }

    const count = await UsersSubjectsRepository.count({
      where: { user_id },
    });

    return res.json(count);
  }
}

export default new UserSubjectsController();
