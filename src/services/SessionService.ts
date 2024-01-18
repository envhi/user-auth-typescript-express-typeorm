import jwt from "jsonwebtoken";

import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

export class SessionService {
  static async createSession(body: any) {
    const user = await userRepository.findOneBy({ email: body.email });

    if (!user) {
      throw { status: 404, message: "Email não cadastrado." };
    }

    if (!(await bcrypt.compare(body.password, user.password_hash))) {
      throw { status: 401, message: "Senha inválida" };
    }

    return jwt.sign({ id: user.id }, process.env.SECRET ?? "", {
      expiresIn: "1d",
    });

    // const { password_hash: _, ...userLogin } = user;

    // const userToken = {
    //   userLogin,
    //   token
    // }

    // return userToken
  }
}
