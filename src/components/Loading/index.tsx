"use client"

import { useState, ReactNode } from "react"

export default function Loading(
    { children, loading = false }: 
    {children: ReactNode, loading: boolean} 
) {
    const [isLoading, setIsLoading] = useState<string>("Loading...")

    if (!loading) {
        return <>{children}</>
    } else {
        return (<div className="flex min-h-screen justify-center items-center">
            {isLoading.split("").map((v: string, i: number) => { 
                if ((i % 2) == 0) {
                    return <h1 className="text-7xl dark:text-white animate-slide-up">{v}</h1>
                } else {
                    return <h1 className="text-7xl dark:text-white animate-slide-down">{v}</h1>
                }
            })}
        </div>
        )
    }
}
