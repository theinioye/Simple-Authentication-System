import express, {Request, Response } from "express"
import { userLogIn, createUser } from "../controllers/userControllers"
const userRouter = express.Router()

import { validateData } from "../middleware/validationMiddleware"
import { userLogInSchema,userSignUpSchema } from "../schemas/userSchemas"

userRouter.post("/users",validateData(userSignUpSchema), createUser)
userRouter.post("/users/logIn", validateData(userLogInSchema), userLogIn)


export default userRouter