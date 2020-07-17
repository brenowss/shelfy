import { Request, Response } from "express";

import { getRepository } from "typeorm";

import Subject from "../models/Subject";

class SubjectController {

  async index(req: Request, res: Response) {
    const repository = getRepository(Subject);

    const subjects = await repository.find()
    return res.send({ subjects });
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(Subject);
    const { id, name, url, icon, color, image } = req.body;

    const subjectExists = await repository.findOne({ where: { name } });

    if (subjectExists) {
      return res.sendStatus(409);
    }

    const subject = repository.create({ id, name, url, icon, color, image });
    await repository.save(subject);

    return res.json(subject)
  }
}

export default new SubjectController();
