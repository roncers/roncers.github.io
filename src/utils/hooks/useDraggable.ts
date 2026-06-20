import { useCallback, useRef, type RefObject } from "react"

/**
 * Makes an element draggable by moving it via inline left/top styles.
 * Returns a mousedown handler to attach to the drag handle (e.g. a header).
 */
export function useDraggable(
  ref: RefObject<HTMLElement | null>,
  updateSize: (offset: { x: number; y: number }) => void,
) {
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
      let lastX = 0
      let lastY = 0

      const onMouseMove = (ev: MouseEvent) => {
        lastX = ev.clientX - dragOffset.current.x
        lastY = ev.clientY - dragOffset.current.y
        el.style.left = `${lastX}px`
        el.style.top = `${lastY}px`
      }

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)
        if (lastX && lastY) updateSize({ x: lastX, y: lastY })
      }

      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", onMouseUp)
    },
    [ref, updateSize],
  )

  return { onDragStart }
}
