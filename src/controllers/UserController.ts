import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

export class UserController {
  async create(req: Request, res: Response) {

    try {
      const { name, email, cpfcnpj, password, account_type } = req.body;

      const userExists = await userRepository.findOneBy({ email: email });

      if (userExists) {
        // throw new BadRequestError("Usuário já cadastrado.");
        throw new Error('user ja existe xxxxxxxxxxx')
      }

      const newUser = userRepository.create({
        name,
        email,
        cpfcnpj,
        password_hash: password,
        account_type,
      });

      newUser.password_hash = await bcrypt.hash(newUser.password_hash, 8);

      await userRepository.save(newUser);

      res.status(201).json(newUser);
    } catch (error: any) {
      console.log(error)
      res.json(error.message)
    }

  }
}
