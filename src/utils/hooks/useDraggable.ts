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
      const originalLeft = el.style.left
      const originalTop = el.style.top
      let lastX: number | null = null
      let lastY: number | null = null

      const onMouseMove = (ev: MouseEvent) => {
        lastX = ev.clientX - dragOffset.current.x
        lastY = ev.clientY - dragOffset.current.y
        el.style.left = `${lastX}px`
        el.style.top = `${lastY}px`
      }

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)
        // restore the pre-drag inline styles so the DOM is back in sync with
        // React's virtual DOM; updateSize then re-renders with the new value
        // (or no-ops if the clamped value is unchanged, leaving the correct one)
        el.style.left = originalLeft
        el.style.top = originalTop
        if (lastX !== null && lastY !== null) updateSize({ x: lastX, y: lastY })
      }

      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", onMouseUp)
    },
    [ref, updateSize],
  )

  return { onDragStart }
}
