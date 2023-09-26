import { FC } from "react";

interface LoadingOptions {
  variant: "square" | "circle" | "rounded";
  height: "sm" | "md" | "lg" | "xl";
}

const Loading: FC<LoadingOptions> = (props) => {
  const {} = props;
  return <div className={`w-full animate-ping bg-slate-500`}></div>;
};

export default Loading;
