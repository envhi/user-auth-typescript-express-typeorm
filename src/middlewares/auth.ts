import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { NotFoundError, UnauthorizedError } from "../helpers/api-erros";
import { userRepository } from "../repositories/userRepository";

type JwtPayload = {
  id: number;
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Não autorizado.");
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.SECRET ?? "") as JwtPayload;

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new NotFoundError("Não autorizado.");
  }

  const { password_hash, cpfcnpj, created_at: _, ...loggedUser } = user;

  req.user = loggedUser;

  return next();
};
