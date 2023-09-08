import { FC } from "react"

interface LoadingOptions {
    variant: "square" | "circle" | "rounded"
    height: "sm" | "md" | "lg" | "xl"
}

const Loading: FC<LoadingOptions> = (props) => {
    const { variant, height } = props
    return (
        <div className={`w-full animate-ping bg-slate-500`}></div>
    )
}

export default Loading