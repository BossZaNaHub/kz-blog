"use client"
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { useAuth } from "@/services/Auth"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Layout = ({ children}: {children: React.ReactNode}) => {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { user, isAuthenticated, login, logout } = useAuth()

    if (!isAuthenticated) {
        router.push('/login')
        return (<></>)
    } else {
        return (
            <div className="">
                <div className="flex h-screen overflow-hidden">
                    <Sidebar 
                        sidebarOpen={sidebarOpen} 
                        setSidebarOpen={setSidebarOpen}
                    />
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                        <Header 
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                        />
                        <Breadcrumb />
                        <main>
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

export default Layout