import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { Validate } from "./middlewares/validation";
import { SessionController } from "./controllers/SessionController";
import { auth } from "./middlewares/auth";
import {
  ApiError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "./helpers/api-erros";

const routes = Router();

routes.post(
  "/user",
  new Validate().userValidation,
  new UserController().create
);
routes.post("/session", new SessionController().create);

routes.use(auth);

routes.get("/teste", (req: any, res) => {
  console.log(req.user);
  console.log(req.headers.authorization);

  res.json({
    msg: "auth ok",
    user: req.user,
    token: req.headers.authorization,
  });
});

export default routes;
