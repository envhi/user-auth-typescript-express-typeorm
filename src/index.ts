import express, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.use(routes);

  // app.use(errorMiddleware);
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    return res.json("erro do middleware //user ja existe");
  });
  return app.listen(process.env.PORT);
});
