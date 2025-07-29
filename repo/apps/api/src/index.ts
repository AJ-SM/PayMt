import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { Request,Response,NextFunction } from "express";
import {PrismaClient} from "../../../packages/database/generated/prisma"



const JWT_SECERET = "anujsidam"
const client = new PrismaClient;
const app = express();

function CreateToken(id:number): string{
    const s_id = id.toString()
    const token = jwt.sign(s_id,JWT_SECERET)
    return token    
}

async function  UserAuth(req:Request,res:Response,next:NextFunction){
    const token:any = req.headers['token']
    let dd = Number(jwt.verify(token,JWT_SECERET))
    
    
    const data = await client.user.findUnique({

            where:{id:dd},
        })
    if(data){
        next();
    }else{
        res.send("Noo Account Found Sorry !!!! ")
    }
}




app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hello world ")
})

app.post('/signup', async (req,res)=>{
    const name:string = req.body.username;
    const lastname:string = req.body.lastname; 
    let password = req.body.password; 
    password = (await bcrypt.hash(password,10)).toString()
   
    await client.user.create({
        data:{
            name:name,
            lastname:lastname,
            password:password,
            Balance:1000,
        }
    })
    res.send(`User Created With username ${name} !!! `)
})


app.post('/signin',async (req,res)=>{
    const name = req.body.username;
    const lastname:string = req.body.lastname; 
    const password:string = req.body.password; 
    const users = await client.user.findUnique({
        where :{ password },
    })
    if(!users){
        res.send("User Not Found !!! ")
    }
    else{
        const token:string = CreateToken(users.id)
        res.send(token)
    }

})
app.post('/account',UserAuth,(req,res)=>{
    const Balance = req.body.Balance
    
    
})


app.post('/wire',UserAuth,(req,res)=>{

})




app.listen(3003)