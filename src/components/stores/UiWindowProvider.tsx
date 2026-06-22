import { createContext, useEffect, useState } from "react"
import { debounce } from "@/utils/functions/debounce"

interface UiWindowContextType {
  width: number
  height: number
}

export const UiWindowContext = createContext<UiWindowContextType>({
  width: typeof window !== "undefined" ? window.innerWidth : 0,
  height: typeof window !== "undefined" ? window.innerHeight : 0,
})

export default function UiWindowProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [size, setSize] = useState<UiWindowContextType>(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  }))

  useEffect(() => {
    const handleResize = debounce(() => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }, 150)

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <UiWindowContext.Provider value={size}>
      {children}
    </UiWindowContext.Provider>
  )
}
