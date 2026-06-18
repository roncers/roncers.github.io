import React, { useRef, useCallback, useMemo } from "react"
import styles from "./PoppingWindow.module.css"

interface PoppingWindowProps {
  id: string
  children?: React.ReactNode
}

function getRandomPosition() {
  const top = Math.floor(Math.random() * 80) + 10
  const left = Math.floor(Math.random() * 80) + 10
  return { top: `${top}%`, left: `${left}%` }
}
// TODO: if clicked put the max z-index available + 1

export default function PoppingWindow({
  id,
  children,
}: PoppingWindowProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null)
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const initialPosition = useMemo(() => getRandomPosition(), [])

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    e.preventDefault()

    const rect = el.getBoundingClientRect()
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }

    const onMouseMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX - dragOffset.current.x}px`
      el.style.top = `${e.clientY - dragOffset.current.y}px`
    }

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
  }, [])

  return (
    <section
      id={id}
      className={styles.poppingWindow}
      style={initialPosition}
      ref={ref}
    >
      <header onMouseDown={onMouseDown}>
        <img src="/close.svg" alt="close" />
      </header>
      {children}
    </section>
  )
}
