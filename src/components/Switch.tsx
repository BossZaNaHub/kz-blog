import { ChangeEvent, ForwardedRef, InputHTMLAttributes, forwardRef, useState } from "react";

interface SwitchProps {}

type InputProps = InputHTMLAttributes<HTMLInputElement> & SwitchProps;

const Switch = forwardRef(({ ...rest }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [inputValue, setInputValue] = useState(rest.checked);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.checked);
    setInputValue(evt.target.checked);
  };

  return (
    <div className="flex space-x-2">
      <label>{rest.placeholder}</label>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          {...rest}
          type="checkbox"
          checked={inputValue}
          className="peer sr-only"
          ref={ref}
          onChange={(e) => handleChange(e)}
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
      </label>
    </div>
  );
});

Switch.displayName = "Switch";

export default Switch;
