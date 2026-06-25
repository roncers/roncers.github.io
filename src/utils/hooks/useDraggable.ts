import { useCallback, useRef, type RefObject } from "react"

/**
 * Makes an element draggable by moving it via inline left/top styles.
 * Returns a mousedown handler to attach to the drag handle (e.g. a header).
 */
export function useDraggable(
  ref: RefObject<HTMLElement | null>,
  updateSize: (offset: { x: number; y: number }) => void,
  handleHeaderDbClick: () => void,
) {
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const onDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const el = ref.current
      if (!el) return
      e.preventDefault()

      const rect = el.getBoundingClientRect()
      dragOffset.current = {
        x:
          "clientX" in e
            ? e.clientX - rect.left
            : e.touches[0].clientX - rect.left,
        y:
          "clientY" in e
            ? e.clientY - rect.top
            : e.touches[0].clientY - rect.top,
      }
      const originalLeft = el.style.left
      const originalTop = el.style.top
      let lastX: number | null = null
      let lastY: number | null = null

      // Shield: a transparent overlay above any iframes so they don't
      // swallow the mouse events that would otherwise freeze the drag.
      const shield = document.createElement("div")
      shield.style.cssText =
        "position:fixed;inset:0;z-index:2147483647;cursor:grabbing;"
      document.body.appendChild(shield)

      const onMouseMove = (ev: MouseEvent | TouchEvent) => {
        const clientX = "touches" in ev ? ev.touches[0].clientX : ev.clientX
        const clientY = "touches" in ev ? ev.touches[0].clientY : ev.clientY
        lastX = clientX - dragOffset.current.x
        lastY = clientY - dragOffset.current.y
        el.style.left = `${lastX}px`
        el.style.top = `${lastY}px`
      }

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)
        window.removeEventListener("touchmove", onMouseMove)
        window.removeEventListener("touchend", onMouseUp)
        shield.remove()
        // restore the pre-drag inline styles so the DOM is back in sync with
        // React's virtual DOM; updateSize then re-renders with the new value
        // (or no-ops if the clamped value is unchanged, leaving the correct one)
        el.style.left = originalLeft
        el.style.top = originalTop
        if (lastX !== null && lastY !== null) {
          updateSize({ x: lastX, y: lastY })
        } else {
          handleHeaderDbClick()
        }
      }

      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", onMouseUp)
      window.addEventListener("touchmove", onMouseMove)
      window.addEventListener("touchend", onMouseUp)
    },
    [ref, updateSize],
  )

  return { onDragStart }
}
