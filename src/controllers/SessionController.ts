import { Request, Response } from "express";
import { SessionService } from "../services/SessionService";

export class SessionController {
  async create(req: Request, res: Response) {
    try {
      const token = await SessionService.createSession(req.body);

      res.status(201).json({ token });
    } catch (error: any) {
      console.log(error);
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    }
  }
}
