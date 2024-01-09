import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";

export class Validate {
  async userValidation(req: Request, res: Response, next: NextFunction){
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório.'),
      email: Yup.string().email().required('O email é obrigatório.'),
      cpfcnpj: Yup.string().required('O cpf ou cnpj é obrigatório.'),
      password: Yup.string().required('A senha é obrigatória.').min(8),
      passwordConfirmation: Yup.string().when("password", (password, field) =>
        password ? field.required('A confirmação de senha é obrigatória').oneOf([Yup.ref("password")]) : field
      ),
      account_type: Yup.mixed().oneOf(['lojista', 'comum']).required('Tipo de usuário deve ser informado!.')
    });

    try {
      await schema.validate(req.body)

      next();
    } catch (error: any) {
      res.status(404).json(error.message)
    }
  }
}
