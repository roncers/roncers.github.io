import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import type { TabComponentProps } from "@/types/reactive-tab.types"
import { useEffect, useState } from 'react'
import styles from './Clock.module.css'

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
      <div className={`${styles.clockContainer} w-full h-full`}>
        <h2 className={`${styles.clockTime} default-header-2 flex items-center justify-center h-full`}>
        {String(time.getHours()).padStart(2, '0')}
        <span style={{ visibility: time.getSeconds() % 2 === 0 ? 'visible' : 'hidden' }}>:</span>
        {String(time.getMinutes()).padStart(2, '0')}
        <span style={{ visibility: time.getSeconds() % 2 === 0 ? 'visible' : 'hidden' }}>:</span>
        {String(time.getSeconds()).padStart(2, '0')}
      </h2>
      </div>
    </PoppingWindow>
  )
}