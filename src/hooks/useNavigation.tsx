"use client"

import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
 
export const useNavigationEvent = (onPathNameChange: () => void) => {
  const pathname = usePathname()

  const savedPathNameRef = useRef(pathname)

  const searchParams = useSearchParams()

  const [isPageLoading, setIsPageLoading] = useState(false)

  useEffect(() => {
    // const url = `${pathname}?${searchParams}`
    // console.log(url)

    if (savedPathNameRef.current !== pathname) {
      onPathNameChange()

      savedPathNameRef.current = pathname
    }
    
  }, [pathname, onPathNameChange])
 
  // return null
}