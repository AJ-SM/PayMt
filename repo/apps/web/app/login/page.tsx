"use client"
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/text-input";
import { useRef } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";


export default function login(){


     const router = useRouter();
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);



    async function sendBackEnd(){
        const data = {
            "username":username.current?.value,
            "password":password.current?.value, 

        }


        console.log(data)
        const url = 'http://localhost:3008/signin'


       try {
            const response = await axios.post(url, data);
            //@ts-ignore
            localStorage.setItem("token", response.data)
            router.push('/Dashboard')

        } catch (err) {
            console.error("Signup failed:", err);
            
        
        }


        
    }
   return (
        <div className=" flex justify-center items-center bg-[#242424] h-screen w-screen">
            <div className="bg-white w-110 h-70 flex-col p-2 rounded-xl gap-2">
                <div className="flex justify-center items-center font-bold text-2xl">Login</div>
                <br />
           
    
    
                <TextInput classname="py-2 px-2 mx-4 w-98 bg-[#F2F2F2] rounded-md flex justify-center " placeholder="Enter Username" ref={username}></TextInput>
                <br />
                <TextInput classname="py-2 px-2 mx-4 w-98 bg-[#F2F2F2] rounded-md flex justify-center " placeholder="Enter Password " ref={password}></TextInput>
              
                <br />
             
                <div className=" flex items-center justify-center"> 
                    <Button onClick={sendBackEnd} className=" flex justify-center px-10 py-2 bg-[#0D0D0D] text-white rounded-md">Login</Button>
                </div> 

            </div>
        </div>
    )
}