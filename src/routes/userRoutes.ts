import express, { Request, Response } from "express";
import {
  userLogIn,
  createUser,
  userDashboard,
} from "../controllers/userControllers";
const userRouter = express.Router();

import {
  authenticateToken,
  validateData,
} from "../middleware/validationMiddleware";
import { userLogInSchema, userSignUpSchema } from "../schemas/userSchemas";

userRouter.post("/users", validateData(userSignUpSchema), createUser);
userRouter.post("/users/logIn", validateData(userLogInSchema), userLogIn);
userRouter.get("/users/dashboard", authenticateToken, userDashboard);

export default userRouter;
 