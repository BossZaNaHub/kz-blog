import { FC, InputHTMLAttributes, useState } from "react"
import { RegisterOptions, UseFormRegister } from "react-hook-form"
import { IconBaseProps, IconContext } from "react-icons"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    icon?: React.ReactElement<IconBaseProps>
}

const Input: FC<InputProps> = (props) => {
    return (
        <div className="flex items-center my-2">
            {props.icon && <span className="mr-1">{props.icon}</span>}
            {props.placeholder && !props.icon && <label>{props.placeholder}</label>}
            <input 
                className="md:max-w-md w-full p-0.5 focus-visible:outline-0 placeholder:indent-1 
                text-primary border-gradient bottom bottom-md focus:border-2 focus:rounded-md focus:placeholder:invisible" 
                {...props}  
            />
        </div>
    )
}

export default Input