import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

export class UserService {
  static async create(body: any) {
    console.log(body);

    const userExists = await userRepository.findOneBy({ email: body.email });

    if(userExists) {
      throw { status: 500, message: 'Email já cadastrado.'}
    }

    const newUser = userRepository.create({
      name: body.name,
      email: body.email,
      cpfcnpj: body.cpfcnpj,
      password_hash: body.password,
      account_type: body.account_type,
    });

    newUser.password_hash = await bcrypt.hash(newUser.password_hash, 8);

    await userRepository.save(newUser);

    return newUser;
  }
}
