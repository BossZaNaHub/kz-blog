"use client";
import { FC, InputHTMLAttributes } from "react";
import { IconBaseProps } from "react-icons";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: React.ReactElement<IconBaseProps>;
  register?: any;
};

const Input: FC<InputProps> = (props) => {
  return (
    <div className="my-2 flex items-center">
      {props.icon && <span className="mr-1">{props.icon}</span>}
      {props.placeholder && !props.icon && <label>{props.placeholder}</label>}
      <input
        className="w-full rounded-lg p-0.5 indent-1 
                text-black  focus:placeholder:invisible focus-visible:outline-0  md:max-w-md"
        {...props.register}
        // {...props}
      />
    </div>
  );
};

export default Input;
