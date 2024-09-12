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

  const user = await prisma.user.findUnique({
    where: {password :String(password)}
        
    } 
  });
  

 

if (!user) {
    return res.json({
        message : `User not found, please `
    })
}

  
};
