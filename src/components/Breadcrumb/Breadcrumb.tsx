"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState, useMemo, useEffect } from "react"
import { LuHome  } from "react-icons/lu"
import { CustomSlash } from '@/components/CustomIcon/CustomSlash'
import { toCamelCase } from "@/utils/camelcase"

interface Breadcrumb {
        
}

const Breadcrumb = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [breadcrumbs, setBreadcrumbs] = useState<string[]>([])
    
    useEffect(() => {
    })

    return (
        <div className="flex gap-3 m-4 p-4 items-center rounded-lg shadow-lg">
            <div className="">
                <Link href="/dashboard" className="inline-flex self-center">
                    <LuHome />&nbsp;Dashboard
                </Link>
            </div>
            {pathname.split("/").length >= 2 ?
                <>
                    <CustomSlash className="text-2xl" />
                    <div>
                        <Link href={pathname}>
                        {pathname.split("/")[pathname.split("/").length - 1]}
                        </Link>
                    </div>
                </>
            : <></>}
            {/* {breadcrumbs.map((v: string, i: number) => {
                return (
                    <div key={i}>
                        <Link href={`/${v}`}>
                            {v == "" ? <LuHome className="inline-flex" /> : toCamelCase(v)}
                        </Link>
                    </div>
                )
            })} */}
        </div>
    )
}

export default Breadcrumb