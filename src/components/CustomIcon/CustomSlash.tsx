import { FC, SVGAttributes } from "react"

type CustomSlashSVGProps = SVGAttributes<SVGElement> & {

}

export const CustomSlash: FC<CustomSlashSVGProps> = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-slash ${props.className}`}><path d="M22 2 2 22"/></svg>
}