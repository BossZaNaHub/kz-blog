"use client"

import { FC } from "react"
import { useRouter, usePathname } from "next/navigation"
import { IconBaseProps } from "react-icons"

interface NavigationMenu {
    menu: Menu[]
}

export type Menu = {
    name: string
    path: string
    icon?: React.ReactElement<IconBaseProps>
}

const Navigation: FC<NavigationMenu> = (props) => {
    const router = useRouter()
    const pathname = usePathname()
    
    return  (
        <>
        {props.menu.map((m: Menu, i: number) => {
            return (
                <div key={i} className={`${pathname === m.path ? "bg-white dark:bg-slate-800 shadow-xl" : "hover:bg-gray-100"} p-3 transition-colors rounded-full cursor-pointer`}>
                    <div onClick={() => {router.push(m.path)}}>
                        {m.icon && <span className="text-2xl">{m.icon}</span>}
                    </div>
                </div>
            )
        })}
        </>
    )
}

export default Navigation