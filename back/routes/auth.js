import { login,register } from '../controllers/authcontrollers.js';
const authRouter = (app) => {
  app.post("/server/login",login);
  app.post("/server/register",register);
};

export default authRouter;