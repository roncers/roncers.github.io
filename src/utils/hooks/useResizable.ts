import { useCallback, type RefObject } from "react"

export type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw"

export const RESIZE_DIRECTIONS: ResizeDirection[] = [
  "n",
  "s",
  "e",
  "w",
  "ne",
  "nw",
  "se",
  "sw",
]

interface UseResizableOptions {
  minWidth?: number
  minHeight?: number
  onResizeEnd?: (
    size: { width: number; height: number },
    position: { x: number; y: number }
  ) => void
}

/**
 * Makes an element resizable from any of the 8 directions by mutating its
 * inline width/height/left/top. Returns a factory that produces a mousedown
 * handler for a given direction, plus the list of directions for rendering handles.
 */
export function useResizable(
  ref: RefObject<HTMLElement | null>,
  { minWidth = 150, minHeight = 100, onResizeEnd }: UseResizableOptions = {}
) {
  const onResizeStart = useCallback(
    (dir: ResizeDirection) => (e: React.MouseEvent) => {
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

      let lastW = startW
      let lastH = startH
      let lastLeft = startLeft
      let lastTop = startTop

      // Shield: a transparent overlay above any iframes so they don't
      // swallow the mouse events that would otherwise freeze the resize.
      const shield = document.createElement("div")
      shield.style.cssText = `position:fixed;inset:0;z-index:2147483647;cursor:${dir}-resize;`
      document.body.appendChild(shield)

      const onMouseMove = (ev: MouseEvent) => {
        const dx = ev.clientX - startX
        const dy = ev.clientY - startY

        if (dir.includes("e")) {
          lastW = Math.max(minWidth, startW + dx)
          el.style.width = `${lastW}px`
        }
        if (dir.includes("s")) {
          lastH = Math.max(minHeight, startH + dy)
          el.style.height = `${lastH}px`
        }
        if (dir.includes("w")) {
          lastW = Math.max(minWidth, startW - dx)
          lastLeft = startLeft + (startW - lastW)
          el.style.width = `${lastW}px`
          el.style.left = `${lastLeft}px`
        }
        if (dir.includes("n")) {
          lastH = Math.max(minHeight, startH - dy)
          lastTop = startTop + (startH - lastH)
          el.style.height = `${lastH}px`
          el.style.top = `${lastTop}px`
        }
      }

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)
        shield.remove()
        onResizeEnd?.(
          { width: lastW, height: lastH },
          { x: lastLeft, y: lastTop }
        )
      }

      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", onMouseUp)
    },
    [ref, minWidth, minHeight, onResizeEnd]
  )

  return { onResizeStart, directions: RESIZE_DIRECTIONS }
}
