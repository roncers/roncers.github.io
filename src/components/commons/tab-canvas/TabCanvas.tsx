import { ReactElement } from "react"
import type { Sketch } from "@/types/p5.types"
import P5Canvas from "@/components/commons/P5Canvas"
import style from "./TabCanvas.module.css"

interface TabCanvasProps {
  sketch: Sketch
  label: string
}

export default function TabCanvas({
  sketch,
  label,
}: TabCanvasProps): ReactElement {
  return (
    <div className={`w-full h-full flex flex-col ${style.tabContainer}`}>
      <label className={style.label}>{label}</label>
      <P5Canvas className={style.canvasWrapper} sketch={sketch} />
    </div>
  )
}
