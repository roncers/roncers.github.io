import { useEffect, useRef } from "react"
import p5 from "p5"

export default function P5Canvas({ sketch }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const parent = containerRef.current
    if (!parent) return

    const instance = new p5((p) => sketch(p, parent), parent)

    return () => instance.remove()
  }, [sketch])

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}></div>
  )
}
