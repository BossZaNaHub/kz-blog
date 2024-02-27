"use client";
import React, { FC, forwardRef, ForwardedRef, InputHTMLAttributes, useState } from "react";
import { IconBaseProps } from "react-icons";

interface CustomInputProps {
  label?: string;
  icon?: React.ReactElement<IconBaseProps>;
}

type InputWrapperProps = InputHTMLAttributes<HTMLInputElement> & CustomInputProps;

const Input = forwardRef(({ ...rest }: InputWrapperProps, ref: ForwardedRef<HTMLInputElement>) => {
  const cls = `w-full rounded-lg p-0.5 indent-1 text-black  focus:placeholder:invisible focus-visible:outline-0 md:max-w-md ${rest.className}`;
  // const [inputValue, setInputValue] = useState<string | number | readonly string[] | undefined>(rest.value);

  // const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(evt.target.value);
  // };

  return (
    <div className="flex space-x-2">
      {rest.icon && <span className="mr-1">{rest.icon}</span>}
      {rest.label && !rest.icon && <label htmlFor={rest.name}>{rest.label}</label>}
      <input name={rest.name} placeholder={rest.placeholder} className={`${cls}`} {...rest} ref={ref} />
    </div>
  );
});

Input.displayName = "Input";

export default Input;
