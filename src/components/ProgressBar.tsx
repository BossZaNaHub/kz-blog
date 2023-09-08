'use client'
import { CSSProperties, useEffect, useState } from "react"

interface IProgressBar {
    progressBarStartToEndRGBColor: [string, string];
    currentProgress: number;
    animationSpeed: number;
}

const ProgressBar: React.FC<IProgressBar> = ({progressBarStartToEndRGBColor, currentProgress, animationSpeed=1}) => {
    const [currentBar, setCurrentBar] = useState<number>(0) 
    const [colorProgressBar, setColorProgressBar] = useState<CSSProperties>({backgroundColor: 'transparent'})

    // const animateStyled: CSSProperties = {}
    useEffect(() => {
        setCurrentBar(currentProgress)
        if (progressBarStartToEndRGBColor.length > 0) {
            setColorProgressBar({background: `linear-gradient(120deg, rgba(${progressBarStartToEndRGBColor[0]}) 0%, rgba(${progressBarStartToEndRGBColor[1]}) 100%)`})
        }
    }, [progressBarStartToEndRGBColor, currentProgress])

    return (
        <div className="flex w-full h-2 rounded-md relative my-4" style={{ background: `linear-gradient(120deg, rgba(${progressBarStartToEndRGBColor[0]}) 0%, rgba(${progressBarStartToEndRGBColor[1]}) 100%)` }}>
            <div className={`w-1.5 h-4 bg-white absolute m-auto top-0 bottom-0 rounded`} style={{left: `${currentBar}%`, transitionProperty: 'left',  transitionDuration: `${animationSpeed}s`, transitionTimingFunction: 'linear'}}></div>
        </div>
    )
}

export default ProgressBar