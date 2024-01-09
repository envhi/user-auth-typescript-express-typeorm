import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { Validate } from "./middlewares/validation";
import { SessionController } from "./controllers/SessionController";
import { auth } from "./middlewares/auth";
import { ApiError, BadRequestError, NotFoundError, UnauthorizedError } from "./helpers/api-erros";


const routes = Router();

routes.get('/', (req, res) => {
  throw new NotFoundError('unauthorized')
})

routes.post('/user', new Validate().userValidation, new UserController().create)
routes.post('/session', new SessionController().create)

routes.use(auth)

routes.get('/teste', (req: any, res) => {

  console.log(req.userId)
  console.log('token ok')
})


export default routes;
