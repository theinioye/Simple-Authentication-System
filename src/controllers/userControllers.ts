import { Request, Response } from "express";
import { prisma } from "../../prisma";

export const createUser = async (req: Request, res: Response) => {
  const data = req.body;

  const newUser = await prisma.user.create({
    data,
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

  const userWithEmail = await prisma.user.findUnique({
    where : { email},
  })
  
  if (userWithEmail) {
    const passwordCheck = password == userWithEmail.password ? res.json( `Welcome. Log In Successful`) : res.json(`Password or email incorrect,please try again`)

    return passwordCheck
  }

const users = await prisma.user.findMany()

const userWithPassword = users.find(user => user.password === password)


if (userWithPassword.username == username ) {
    return res.json({
        message :`Password incorrect `
    })
}

return 



}