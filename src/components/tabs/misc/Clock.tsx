import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import type { TabComponentProps } from "@/types/tab.types"
import {useEffect, useState} from 'react'

export default function Clock({ ...props }: TabComponentProps) {
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])
  return (
    <PoppingWindow {...props}>
      <h2 className="default-header-2 flex items-center justify-center h-full">{time.getHours()}:{time.getMinutes()}:{time.getSeconds()}</h2>
    </PoppingWindow>
  )
}