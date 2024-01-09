import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const auth = async (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Sem token" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded: any = await jwt.verify(token, process.env.SECRET ?? '') ;

    req.userId = decoded.id;

    console.log(req.userId);

    return next();
  } catch (error: any) {
    console.log(error.message)
  }
};
