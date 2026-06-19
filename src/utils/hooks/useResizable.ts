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
}

/**
 * Makes an element resizable from any of the 8 directions by mutating its
 * inline width/height/left/top. Returns a factory that produces a mousedown
 * handler for a given direction, plus the list of directions for rendering handles.
 */
export function useResizable(
  ref: RefObject<HTMLElement | null>,
  { minWidth = 150, minHeight = 100 }: UseResizableOptions = {}
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

      const onMouseMove = (ev: MouseEvent) => {
        const dx = ev.clientX - startX
        const dy = ev.clientY - startY

        if (dir.includes("e")) {
          el.style.width = `${Math.max(minWidth, startW + dx)}px`
        }
        if (dir.includes("s")) {
          el.style.height = `${Math.max(minHeight, startH + dy)}px`
        }
        if (dir.includes("w")) {
          const newW = Math.max(minWidth, startW - dx)
          el.style.width = `${newW}px`
          el.style.left = `${startLeft + (startW - newW)}px`
        }
        if (dir.includes("n")) {
          const newH = Math.max(minHeight, startH - dy)
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
    [ref, minWidth, minHeight]
  )

  return { onResizeStart, directions: RESIZE_DIRECTIONS }
}
