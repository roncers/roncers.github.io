import React, { useRef, useCallback, useMemo } from "react"
import styles from "./PoppingWindow.module.css"
import CloseIcon from '@/components/icons/CloseIcon'
// import MinimizeIcon from '@/components/icons/MinimizeIcon'
import MaximizeIcon from '@/components/icons/MaximizeIcon'
import HideIcon from '@/components/icons/HideIcon'
import UiButton from '@/components/commons/ui-button/UiButton'

interface PoppingWindowProps {
  id: string
  children?: React.ReactNode
}

function getRandomPosition() {
  const top = Math.floor(Math.random() * 80) + 10
  const left = Math.floor(Math.random() * 80) + 10
  return { top: `${top}%`, left: `${left}%` }
}

const MIN_WIDTH = 150
const MIN_HEIGHT = 100

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw"
// TODO: if clicked put the max z-index available + 1
// Also in this context It would be useful to include all the shared relevant data of the popovers, to being able to close them without references.

export default function PoppingWindow({
  id,
  children,
}: PoppingWindowProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null)
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const initialPosition = useMemo(() => getRandomPosition(), [])

  // TODO: aisle the stuff so the component gets leaner

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

  const onResizeMouseDown = useCallback(
    (dir: ResizeDirection) => (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      e.preventDefault()
      e.stopPropagation()

      const rect = el.getBoundingClientRect()
      const startX = e.clientX
      const startY = e.clientY
      const startW = rect.width
      const startH = rect.height
      const startLeft = rect.left
      const startTop = rect.top

      const onMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - startX
        const dy = e.clientY - startY

        if (dir.includes("e")) {
          el.style.width = `${Math.max(MIN_WIDTH, startW + dx)}px`
        }
        if (dir.includes("s")) {
          el.style.height = `${Math.max(MIN_HEIGHT, startH + dy)}px`
        }
        if (dir.includes("w")) {
          const newW = Math.max(MIN_WIDTH, startW - dx)
          el.style.width = `${newW}px`
          el.style.left = `${startLeft + (startW - newW)}px`
        }
        if (dir.includes("n")) {
          const newH = Math.max(MIN_HEIGHT, startH - dy)
          el.style.height = `${newH}px`
          el.style.top = `${startTop + (startH - newH)}px`
        }
      }

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)
      }

      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", onMouseUp)
    },
    [],
  )

  return (
    <section
      id={id}
      className={styles.poppingWindow}
      style={initialPosition}
      ref={ref}
    >
      <header onMouseDown={onMouseDown}>
        <UiButton><HideIcon /></UiButton>
        <UiButton><MaximizeIcon /></UiButton>
        <UiButton className={styles.closeIcon}><CloseIcon /></UiButton>
      </header>
      <div className={styles.content}>{children}</div>
      {(["n", "s", "e", "w", "ne", "nw", "se", "sw"] as ResizeDirection[]).map((dir) => (
        <div
          key={dir}
          className={`${styles.handle} ${styles[dir]}`}
          onMouseDown={onResizeMouseDown(dir)}
        />
      ))}
    </section>
  )
}
