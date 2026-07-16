import { ReactElement } from "react"
import type { Sketch } from "@/types/p5.types"
import P5Canvas from "@/components/commons/P5Canvas"

interface TabCanvasProps {
  sketch: Sketch
  label: string
}

export default function TabCanvas({
  sketch,
  label,
}: TabCanvasProps): ReactElement {
  return (
    <div className={`w-full h-full flex flex-col gap-1 default-padding`}>
      <label className="default-label">{label}</label>
      <P5Canvas className="default-border" sketch={sketch} />
    </div>
  )
}
