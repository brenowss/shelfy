import { Request, Response } from "express";

import { getRepository } from "typeorm";

import Highlight from "../models/Highlight";

class HighlightController {

  async index(req: Request, res: Response) {
    const repository = getRepository(Highlight);

    const highlight = await repository.findOne({ order: { id: "DESC" } })
    return res.send({ highlight });
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(Highlight);
    const { id, title, google_books_id } = req.body;

    const highlightExists = await repository.findOne({ where: { title } });

    if (highlightExists) {
      return res.sendStatus(409);
    }

    const date = new Date().toLocaleDateString("pt-br")
    
    const highlight = repository.create({ id, title, google_books_id, date });
    await repository.save(highlight);

    return res.json(highlight)
  }
}

export default new HighlightController();
