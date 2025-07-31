import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/text-input";

export default function login(){
  return (
        <div className=" flex justify-center items-center bg-[#242424] h-screen w-screen">
            <div className="bg-white w-110 h-90 flex-col p-2 rounded-xl gap-2">
                <div className="flex justify-center items-center font-bold text-2xl">Login</div>
                <br />
           
    
    
                <TextInput classname="py-2 px-2 mx-4 w-98 bg-[#F2F2F2] rounded-md flex justify-center " placeholder="Enter Username"></TextInput>
                <br />
                <TextInput classname="py-2 px-2 mx-4 w-98 bg-[#F2F2F2] rounded-md flex justify-center " placeholder="Enter Password "></TextInput>
                
                <br />
                   <TextInput classname="py-2 px-2 mx-4 w-98 bg-[#F2F2F2] rounded-md flex justify-center " placeholder="Enter Balance "></TextInput>
                
                <br />
                <br />
             
                <div className=" flex items-center justify-center"> 
                    <Button appName="nigga" className=" flex justify-center px-10 py-2 bg-[#0D0D0D] text-white rounded-md">Login</Button>
                </div> 

            </div>
        </div>
    )
}