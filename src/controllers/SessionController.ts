import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

export class SessionController {
  async create(req: Request, res: Response) {

    try {
      const { email, password } = req.body;

    const user = await userRepository.findOneBy({ email: email });

    if (!user) {
      throw new Error('email nao registrado xxxxxxxxxxxxxxxxxxxxxxxxxxx')
    }

    if (!(await bcrypt.compare(password, user.password_hash))) {
      throw new Error("senha invalida xxxxxxxxxxxxxx");
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET ?? "", {
      expiresIn: "1d",
    });

    const { password_hash: _, ...userLogin } = user;

    res.status(201).json({ userLogin, token });
    } catch (error) {
      console.log(error)
      res.json(error)
    }
  }
}
