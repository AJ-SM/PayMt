import express from "express";

const app = express();

app.use(express.json());

app.get("/main",(req,res)=>{
    res.send("Hello World ");
});

app.post("/signup", (req,res)=>{

})

app.post("/signin",(req,res)=>{
    
})



app.listen(3002);