import express from "express";
import jwt from "jsonwebtoken";
const cors = require('cors'); // 1. Import the package
import { Request,Response,NextFunction } from "express";
import {PrismaClient} from "../../../packages/database/generated/prisma"


const JWT_SECERET = "anujsidam"
const client = new PrismaClient;
const app = express();
app.use(cors());
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
    const balance = Number(req.body.balance)
    let password = req.body.password; 
    password.toString()
   
    await client.user.create({
        data:{
            name:name,
            lastname:lastname,
            password:password,
            Balance:balance,
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
app.post('/account',UserAuth,async (req,res)=>{
    const token:any = req.headers['token']
    let dd = Number(jwt.verify(token,JWT_SECERET))
    const data = await client.user.findUnique({
        where:{id:dd},
    })
    res.send(data?.Balance)

    
   
    
    
})


app.post('/send', UserAuth, async (req, res) => {
  try {
      //@ts-ignore
      const amount = parseFloat(req.query.amount); 
    const uid:number = Number(req.query.id)
    const token:any = req.headers['token'];
    const dd = Number(jwt.verify(token,JWT_SECERET))
    const userId= dd;
    const user = await client.user.findUnique({
        where:{id:dd}, select: { Balance: true },
    })

    const user2 = await client.user.findUnique({
        where:{id:uid}, select: { Balance: true },
    })
    if(!user2){
        return res.status(404).json({error:"Reciver Id is not correct / Reciver NOt found!!!"})
    }


    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    //@ts-ignore
    if (user.Balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

const updatedUsers = await client.$transaction(async (tx) => {
  const sender = await tx.user.update({
    where: { id: userId },
    data: {
      Balance: {
        decrement: amount,
      },
    },
  });

  const receiver = await tx.user.update({
    where: { id: uid },
    data: {
      Balance: {
        increment: amount,
      },
    },
  });

  return { sender, receiver };
});


    res.status(200).json({
      message: "Transaction successful",
      Sender : updatedUsers.sender.Balance,
      Reciver :  updatedUsers.receiver.Balance,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.listen(3008)