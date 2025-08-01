"use client";


interface BoxProp {
    classname?:string,
    placeholder:string,
    ref:any
}

export function TextInput({  ref,classname , placeholder }:BoxProp ){
    return <input className={classname} ref={ref}  placeholder={placeholder}></input>
}