import {z}  from "zod"
import { Request,Response,NextFunction } from "express"




export const validateData = (schema : z.ZodObject<any,any>) =>
(req: Request, res: Response, next : NextFunction ) => {
    const result = schema.safeParse(req.body)

    if (!result.success)  {
        const errors = result.error.format()
        return res.status(400).json({
            message : "Validation failed",
            errors,
        })
    }
    req.body = result.data
    next()
}