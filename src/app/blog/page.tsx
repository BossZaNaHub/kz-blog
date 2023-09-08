"use client"

import Card from "@/components/Card"
import { Metadata } from "next"
import { Suspense, useEffect, useState } from "react"
import Loading from "./loading"

const Page = () => {
    const listBlog = async () => {
        await fetch('/api', {
            method: "GET"
        })
    }
    const [blogs, setBlogs] = useState<any[]>([1,2,3,4,5])

    useEffect(() => {
        listBlog().then(res => console.log(res))
        // return {}
    }, [])

    return (
        <div className="w-full min-h-full py-32">
            <div className="flex justify-center pb-10">
                <h1 className="text-xl h-2">Blog</h1>
            </div>
            <div className="flex flex-wrap gap-4 justify-center mx-5">
                {blogs.map((v: any, i: number) => {
                    return (
                        <Suspense fallback={<Loading variant="square" height="md"/>} key={i}>
                            <Card />
                        </Suspense>
                    )
                })}
                
            </div>
        </div>
    )
}

export default Page