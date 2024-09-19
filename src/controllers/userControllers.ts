import { Request, Response } from "express";
import { prisma } from "../../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {MY_SECRET_KEY} from "./key"

export const createUser = async (req: Request, res: Response) => {
  const data = req.body;
  const { username, email, password } = data;

  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  return res.status(201).json({
    message: `You have successfully signed up with the following details`,
    newUser,
  });
};

export const userLogIn = async (req: Request, res: Response) => {
  const data = req.body;
  const { email, username, password } = data;

  if (!username && !email) {
    return res.json({
      message: `Please include username or email to log in `,
    });
  }

  const user = await prisma.user.findUnique({
    where: { email, username },
  });

  if (!user) {
    return res.status(400).json({
      message: `Email or Username does not exist. Please try again`,
    });
  }
  const passwordCheck = await bcrypt.compare(password, user.password);

  if (!passwordCheck) {
    res.status(400).json(`Password  incorrect,please try again`);
  } else {

  const token = jwt.sign({id:user.id, username : user.username, email : user.email}, MY_SECRET_KEY,{
    expiresIn : "1h",
  })
  res.status(200).json ({
    message : `Welcome. Log In Successful`,token
  })
}
};

export const userDashboard = (req : Request, res: Response) => {
    const user = (req as any).user

    return res.status(200).json ({
        message : `Welcome to your dashboard, ${user.username}`
    })

}
