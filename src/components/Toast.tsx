"use client"

import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import { LuCheckCircle, LuInfo } from 'react-icons/lu'

export type ToastStatus =  "success" | "info" | "failed"

interface ToastProviderConfig {
    children: ReactNode
}

interface Toast {
    content: string
    options: ToastOption
    isVisible: boolean
}

interface ToastOption {
    duration?: number
    status?: ToastStatus
    widthPercentage?: number
    id?: string
}

const ToastContext = createContext({
    showToast: (content: string, options: ToastOption) => {}, 
    closeToast: (id: string) => {}
})

export const ToastProvider = ({ children }: ToastProviderConfig) => {
    const [toasts, setToasts] = useState<Toast[]>([])

    useEffect(() => {
        const interval = 10
        let startTime = Date.now()
        setToasts(
            (prevToasts: Toast[]) => {
                prevToasts?.map(toast => {
                console.log('toast: ', toast)
                const currentTime = Date.now()
                const elapsedTime = currentTime - startTime
                const duration = toast.options.duration || 0
                const endTime = startTime + duration
                const percentage = toast.options.widthPercentage || 100

                if (currentTime < endTime) {
                    toast.options.widthPercentage = (elapsedTime / duration) * percentage
                } else {
                    clearInterval(interval)   
                }
            })

            return prevToasts
        })
        return () => {
            clearInterval(interval)
        }
    }, [toasts])

    const showToast = (content: string, options?: ToastOption) => {
        const newToast: Toast = {
            content: content,
            options: {
                id: uuid(),
                duration: options?.duration || 3000,
                status: options?.status,
                widthPercentage: 100,
            },
            isVisible: true
        }
        setToasts((prevToasts: Toast[]) => [...prevToasts, newToast])
    }

    const closeToast = (id?: string) => {
        setToasts((prevToasts: Toast[]) => prevToasts.filter((toast) => {
            if (toast.options.id !== id) {
                console.log('yyy')
                return toast
            } else {
                //Do nothing
                toast.isVisible = false
            }
        }));   
    }

    const _renderStatusIcon = (toast: Toast) => {
        switch (toast.options.status) {
            case "success":
                return (
                    <div className={`flex items-center w-full max-w-xs p-4 text-white bg-green-400 shadow-md rounded-md relative my-4 ${toast.isVisible ? 'animate-fade-in' : 'animate-fade-out'}`} key={toast.options.id}>
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                            <LuCheckCircle className="w-4 h-4" />
                            <span className="sr-only">Success icon</span>
                        </div>
                        <div className="ml-3 text-sm font-normal">{toast.content}</div>
                        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" 
                            data-dismiss-target="#toast-default" aria-label="Close" onClick={() => closeToast(toast.options.id)}>
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                        <div className="bg-green-300 h-1 absolute bottom-0 left-0" 
                            style={{transitionProperty: 'width', transitionDuration: `${toast.options.duration}ms`, transitionTimingFunction: 'ease-in-out', width: `${toast.options.widthPercentage}%` }}>
                        </div>
                    </div>
                )
            case "info":
                return (
                    <div className={`flex items-center w-full max-w-xs p-4 text-white bg-blue-400 shadow-md rounded-md relative my-4 ${toast.isVisible ? 'animate-fade-in': 'animate-fade-out'}`} key={toast.options.id}>
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                            <LuInfo className="w-4 h-4" />
                            <span className="sr-only">Info icon</span>
                        </div>
                        <div className="ml-3 text-sm font-normal">{toast.content}</div>
                        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" 
                        data-dismiss-target="#toast-default" aria-label="Close" onClick={() => closeToast(toast.options.id)}>
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                        <div className="bg-blue-300 h-1 absolute bottom-0 left-0" 
                            style={{transitionProperty: 'width', transitionDuration: `${toast.options.duration}ms`, transitionTimingFunction: 'ease-in-out', width: `${toast.options.widthPercentage}%` }}>
                        </div>
                    </div>
                )
            case "failed":
                return (
                    <div className={`flex items-center w-full max-w-xs p-4 text-white bg-red-400 shadow-md rounded-md relative my-4 ${toast.isVisible ? 'animate-fade-in': 'animate-fade-out'}`} key={toast.options.id}>
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                            <LuInfo className="w-4 h-4" />
                            <span className="sr-only">Failed icon</span>
                        </div>
                        <div className="ml-3 text-sm font-normal">{toast.content}</div>
                        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" 
                        data-dismiss-target="#toast-default" aria-label="Close" onClick={() => closeToast(toast.options.id)}>
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                        <div className="bg-red-300 h-1 absolute bottom-0 left-0" 
                            style={{transitionProperty: 'width', transitionDuration: `${toast.options.duration}ms`, transitionTimingFunction: 'ease-in-out', width: `${toast.options.widthPercentage}%` }}>
                        </div>
                    </div>
                )
            default: 
                return (
                    <>
                    {/* <svg className="w-4 h-4" aria-hidden="true" xmlns="http:ww.w3.org/2000/svg" fill="none" viewBox="0 0 18 20"> */}
                        {/* <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"/> */}
                    {/* </svg> */}
                    {/* <span className="sr-only">Fire icon</span> */}
                    </>
                )
        }
    }

    
    return (
        <ToastContext.Provider value={{showToast, closeToast}}>
            {children}
            <div className="absolute w-72 max-w-sm right-4 top-5 z-50">
            {toasts?.map((v, i) => {
                return (
                    <div key={i}>
                        {_renderStatusIcon(v)}
                    </div>
                )
            })}
            </div>
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
      }
    return context;
}