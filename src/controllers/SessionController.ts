import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import { NotFoundError, UnauthorizedError } from "../helpers/api-erros";

export class SessionController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userRepository.findOneBy({ email: email });

    if (!user) {
      throw new NotFoundError("Usuário ou senha inválido(s)");
    }

    if (!(await bcrypt.compare(password, user.password_hash))) {
      throw new UnauthorizedError("Usuário ou senha inválido(s)");
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET ?? "", {
      expiresIn: "1d",
    });

    const { password_hash: _, ...userLogin } = user;

    res.status(201).json({ userLogin, token });
  }
}
