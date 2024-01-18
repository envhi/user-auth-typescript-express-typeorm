import { Request, Response } from "express";
import { UserService } from "../services/UserService";
export class UserController {
  async create(req: Request, res: Response) {
    try {
      const newUser = await UserService.create(req.body);
      res.status(201).json(newUser);
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    }
  }
}
