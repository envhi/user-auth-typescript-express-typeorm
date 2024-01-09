import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt'

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, cpfcnpj, password, account_type } = req.body;

    try {
      const newUser = userRepository.create({
        name, email, cpfcnpj, password_hash: password, account_type
      })

      newUser.password_hash = await bcrypt.hash(newUser.password_hash, 8)

      await userRepository.save(newUser)

      res.status(201).json(newUser);
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json(error.message)
    }
  }
}
