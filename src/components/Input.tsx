"use client";
import { FC, forwardRef, ForwardedRef, InputHTMLAttributes, useState } from "react";
import { FieldValues, UseFormReturn, useController, useFormContext } from "react-hook-form";
import { IconBaseProps } from "react-icons";

interface CustomInputProps {
  label?: string;
  icon?: React.ReactElement<IconBaseProps>;
}

type InputWrapperProps = InputHTMLAttributes<HTMLInputElement> & CustomInputProps;

const Input: FC<InputWrapperProps> = ({ ...rest }) => {
  const { control } = useFormContext<UseFormReturn<FieldValues>>();
  const cls = `w-full rounded-lg p-0.5 indent-1 text-black  focus:placeholder:invisible focus-visible:outline-0 md:max-w-md ${rest.className}`;
  // const [inputValue, setInputValue] = useState<string | number | readonly string[] | undefined>(rest.value);

  // const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(evt.target.value);
  // };

  return (
    <div className="flex space-x-2">
      {rest.icon && <span className="mr-1">{rest.icon}</span>}
      {rest.placeholder && !rest.icon && <label htmlFor={rest.name}>{rest.placeholder}</label>}
      {/* <Controller name={rest.name} control={control} render={<input {...field} {...rest} className={`${cls}`} />} /> */}
      {fieldState.error && <span className="text-red-700">{fieldState.error.message}</span>}
    </div>
  );
};

// Input.displayName = "Input";

export default Input;
