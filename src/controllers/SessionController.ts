import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt'

export class SessionController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    try {

      const user = await userRepository.findOneBy({email: email})

      if(!user){
        return res.status(500).json({message: 'usuário não encontrado'})
      }

      if(!(await bcrypt.compare(password, user.password_hash))){
        return res.json({message: 'password invalido'})
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET ?? '', {
        expiresIn: '1d',
      });

      res.status(201).json({user, token});
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json(error.message)
    }
  }
}
