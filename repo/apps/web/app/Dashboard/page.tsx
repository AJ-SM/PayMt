import { TextInput } from "@repo/ui/text-input";
import { Button } from "@repo/ui/button";
export default function dashboard(){
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
            Balance : 
        </div>

        <br />
        <div className="flex gap-1">
            <TextInput classname="py-2 px-2 mx-4 w-98 bg-[#F2F2F2] rounded-md flex justify-center" placeholder="Enter Reciver ID"></TextInput>
            <TextInput classname="py-2 px-2 mx-4 w-98 bg-[#F2F2F2] rounded-md flex justify-center" placeholder="Enter Amount"></TextInput>
            <Button appName="Walk" className="flex justify-center px-10 py-2 bg-[#0D0D0D] text-white rounded-md" >Pay</Button>

        </div>

        </div>
    </div>

    )
}