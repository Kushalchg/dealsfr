"use client"

import { useEffect, useState } from "react"

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Prevent running during SSR
    if (typeof window === "undefined") return

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint)
    }

    // Run once on mount
    checkMobile()

    // Listen for screen size changes
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [breakpoint])

  return isMobile
}
