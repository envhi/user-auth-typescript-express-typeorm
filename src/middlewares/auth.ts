import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";

type JwtPayload = {
  id: number;
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { authorization } = req.headers;

  if (!authorization) {
    throw new Error("Não autorizado xxxxxx nao tem token.");
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.SECRET ?? "") as JwtPayload;

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new Error("Não autorizado xxxxxx nao tem usuario com base no id/token.");
  }

  const { password_hash, cpfcnpj, created_at: _, ...loggedUser } = user;

  req.user = loggedUser;

  console.log(loggedUser,' logged user xxxxxxxxxxx')

  return next();
  } catch (error) {

    console.log(error)
    res.json(error)

  }

};
