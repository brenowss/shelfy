import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.sendStatus(401);
  }

  const token = authorization!.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY!);

    const { id } = data as TokenPayload;

    req.userId = id;

    return next();
  } catch {
    res.sendStatus(401);
  }
}
