import { useCallback, useRef, type RefObject } from "react"

/**
 * Makes an element draggable by moving it via inline left/top styles.
 * Returns a mousedown handler to attach to the drag handle (e.g. a header).
 */
export function useDraggable(ref: RefObject<HTMLElement | null>) {
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const onDragStart = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      e.preventDefault()

      const rect = el.getBoundingClientRect()
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      const onMouseMove = (ev: MouseEvent) => {
        el.style.left = `${ev.clientX - dragOffset.current.x}px`
        el.style.top = `${ev.clientY - dragOffset.current.y}px`
      }

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)
      }

      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", onMouseUp)
    },
    [ref]
  )

  return { onDragStart }
}
