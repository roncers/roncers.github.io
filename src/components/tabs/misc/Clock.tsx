import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import type { TabComponentProps } from "@/types/tab.types"
import { useEffect, useState } from 'react'

export default function Clock({ ...props }: TabComponentProps) {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    // TODO ignore cursor os no can select
    <PoppingWindow {...props}>
      <h2 className="default-header-2 flex items-center justify-center h-full">
        {String(time.getHours()).padStart(2, '0')}
        <span className="blink">:</span>
        {String(time.getMinutes()).padStart(2, '0')}
        <span className="blink">:</span>
        {String(time.getSeconds()).padStart(2, '0')}
      </h2>
    </PoppingWindow>
  )
}