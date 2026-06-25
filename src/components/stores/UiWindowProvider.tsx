import { createContext, useEffect, useState } from "react"
import { debounce } from "@/utils/functions/debounce"

interface UiWindowContextType {
  width: number
  height: number
  isMobile: boolean
}

function checkIfMobile(userAgent: string): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(userAgent)
}

export const UiWindowContext = createContext<UiWindowContextType>({
  width: typeof window !== "undefined" ? window.innerWidth : 0,
  height: typeof window !== "undefined" ? window.innerHeight : 0,
  isMobile: typeof window !== "undefined" ? checkIfMobile(window.navigator.userAgent) : false,
})

export default function UiWindowProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [size, setSize] = useState<Omit<UiWindowContextType, "isMobile">>(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  }))

  const isMobile: Omit<UiWindowContextType, "width" | "height"> = {
    isMobile: typeof window !== "undefined" ? checkIfMobile(window.navigator.userAgent) : false,
  }

  useEffect(() => {
    const handleResize = debounce(() => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }, 150)

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <UiWindowContext.Provider value={{ ...size, ...isMobile }}>
      {children}
    </UiWindowContext.Provider>
  )
}
