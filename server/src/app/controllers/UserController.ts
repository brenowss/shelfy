import { Request, Response } from "express";

import { getRepository } from "typeorm";

import User from "../models/User";

class UserController {
  async store(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, first_name, last_name, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.sendStatus(409);
    }

    const user = repository.create({ email, first_name, last_name, password });
    await repository.save(user);

    return res.json(user)
  }

  async index(req: Request, res: Response) {
    const repository = getRepository(User);

    const allUsers = await repository.find()
    return res.send({ userID: req.userId, allUsers});
  }
}

export default new UserController();
