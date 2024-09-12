import express,{Express,Request,Response}  from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import userRouter from 

dotenv.config()

const app : Express  = express()
const port = process.env.PORT || 3000


app.use(bodyParser.json())
app.use(`/api/user`, userRouter)



app.get("/", (req: Request , res : Response) => {
    res.send ("Express + Typescript ")
})

app.listen(port, ()  => {
    console.log (`[server] : Server is running at http://localhost:${port}`)
})