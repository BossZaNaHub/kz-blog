import { ButtonHTMLAttributes, FC, ReactNode, useEffect, useState } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "rounded" | "square";
  color?: "default" | "primary" | "warning" | "info" | "danger";
};

const Button: FC<ButtonProps> = ({ ...props }) => {
  const color = props.color ? props.color : "default";
  const variant = props.variant ? props.variant : "default";
  const [buttonColor, setButtonColor] = useState<string>("");
  const [buttonVariant, setButtonVariant] = useState<string>("");

  const setColor = (color: "default" | "primary" | "warning" | "info" | "danger") => {
    let txt = "";
    switch (color) {
      case "primary":
        txt =
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700";
        setButtonColor(txt);
        break;
      case "danger":
        txt =
          "border border-red-300 bg-red-300 text-red-900 hover:bg-red-500 focus:ring-4 focus:ring-red-200 dark:border-red-600 dark:bg-red-800 dark:text-white dark:hover:border-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700";
        setButtonColor(txt);
        break;
      case "info":
        txt =
          "border border-indigo-300 bg-indigo-300 text-indigo-900 hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-200 dark:border-indigo-600 dark:bg-indigo-800 dark:text-white dark:hover:border-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-700";
        setButtonColor(txt);
        break;
      case "warning":
        txt =
          "border border-yellow-300 bg-yellow-300 text-yellow-900 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-200 dark:border-yellow-600 dark:bg-yellow-800 dark:text-white dark:hover:border-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-700";
        setButtonColor(txt);
        break;
      default:
        txt =
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700";
        setButtonColor(txt);
        break;
    }
  };
  const setVariant = (variant?: "default" | "rounded" | "square") => {
    let txt = "";
    switch (variant) {
      case "rounded":
        txt = "rounded-lg";
        setButtonVariant(txt);
        break;
      case "square":
        txt = "";
        setButtonVariant(txt);
        break;
      default:
        txt = "rounded-lg";
        setButtonVariant(txt);
        break;
    }
  };

  useEffect(() => {
    setColor(color);
    setVariant(variant);
  });

  return (
    <button {...props} className={`px-5 py-2.5 text-sm font-medium focus:outline-none ${buttonColor} ${buttonVariant}`}>
      {props.children}
    </button>
  );
};

export default Button;
