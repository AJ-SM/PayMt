"use client";


interface BoxProp {
    classname?:string,
    placeholder:string,
}

export function TextInput({  classname , placeholder }:BoxProp ){
    return <input className={classname} placeholder={placeholder}></input>
}