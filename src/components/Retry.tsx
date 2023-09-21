import { ButtonHTMLAttributes, FC } from "react";
import { LuWifiOff } from "react-icons/lu";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  full?: boolean;
};

const Retry: FC<ButtonProps> = (props) => {
  return (
    <div className={`flex items-center justify-center ${props.full ? "min-h-screen" : ""}`}>
      <button
        className="flex items-center gap-1 rounded-md bg-blue-100 p-1.5 transition-colors hover:bg-blue-500 hover:text-white dark:bg-blue-900 dark:text-white dark:hover:bg-blue-950"
        {...props}
      >
        <LuWifiOff className="text-2xl" /> <span className="text-2xl">Retry</span>
      </button>
    </div>
  );
};

export default Retry;
