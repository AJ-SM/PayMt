import express from "express";
import { Jwt } from "jsonwebtoken";
import {PrismaClient} from "../../../packages/database/generated/prisma"

const client = new PrismaClient;
const app = express();

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hello world ")
})

app.post('/signup', async (req,res)=>{
    const name:string = req.body.username;
    const lastname:string = req.body.lastname; 
    const password:string = req.body.password; 
   
    await client.user.create({
        data:{
            name:name,
            lastname:lastname,
            password:password,
        }
    })
    res.send(`User Created With username ${name} !!! `)

})


app.post('/signin',(req,res)=>{
    let name:string = req.body.username;
    const password = req.body.password;
    res.send(`Hello ${name}`)
})




app.listen(3003)