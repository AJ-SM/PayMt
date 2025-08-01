"use client"
import { TextInput } from "@repo/ui/text-input";
import { Button } from "@repo/ui/button";
import { useRef,useState } from "react";
import axios from "axios";


export default function dashboard(){
    const [balance, setBalance] = useState(0);
    const id = useRef<HTMLInputElement>(null);
    const amount = useRef<HTMLInputElement>(null);
    async function sendMoney(){
        const uid = id.current?.value
        const money = amount.current?.value
        const data = {id:uid,amount:money};
        console.log(data)
        const url ="http://localhost:3008/send";

        try{
            const response = await axios.post(url,data)
            console.log(response.data)
            alert("Money Send !!! ")
            // setBalance(response.data.sender)

        }catch(err){
            console.log(err)
        

        }
        

    }

    
    
    return (
        <div className="mx-45 border-x-1 h-screen">
            <div className="flex justify-center items-center border-y-1">
            <div className="my-3 flex items-center place-content-end  ">
                <div className="text-2xl font-bold">PayMT</div>
                <div className=" w-9 h-9 bg-purple-300 rounded-full ml-210"> </div>
                <div className="font-medium ml-2">  User</div>
            </div>
        </div>

        <div className="h-screen m-9">  
        <div className="font-bold">
            Balance : {balance}
        </div>

        <br />
        <div className="flex gap-1">
            <TextInput classname="py-2 px-2 mx-4 w-98 bg-[#F2F2F2] rounded-md flex justify-center" placeholder="Enter Reciver ID" ref={id} ></TextInput>
            <TextInput classname="py-2 px-2 mx-4 w-98 bg-[#F2F2F2] rounded-md flex justify-center" placeholder="Enter Amount" ref={amount}></TextInput>
            <Button onClick={sendMoney}  className="flex justify-center px-10 py-2 bg-[#0D0D0D] text-white rounded-md" >Pay</Button>

        </div>

        </div>
    </div>

    )
}