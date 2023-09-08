"use client"
import { LuDog, LuLibrary, LuPhone } from "react-icons/lu"
import { usePathname, useRouter } from 'next/navigation'
import Navigation, { Menu } from "./Navigation"
import { useNavigationEvent } from '@/hooks/useNavigation'
import { Suspense, useEffect, useState } from "react"

const menu: Menu[] = [{name: '', path: '/blog', icon: <LuLibrary  />}, {name: '', path: '/', icon: <LuDog  />}, {name: '', path: '/contact', icon: <LuPhone  />}]

const Header = () => {
    const pathname = usePathname()

    if (!pathname.includes("/dashboard")) {
        return (
            <header className="sticky top-5 z-50 flex md:w-1/2 w-full shadow-md bg-dashboard md:mx-auto rounded-full px-10 mx-auto">
                <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-10">
                    <Navigation menu={menu} />
                </div>
            </header>
        )
    }
}

export default Header