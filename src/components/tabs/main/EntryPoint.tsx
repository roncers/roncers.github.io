import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import type { TabComponentProps } from "@/types/tab.types"
import { useAddTab } from "@/utils/hooks/useAddTab"
import CellSketch from "../p5/CellSketch"
import LavaSketch from "../p5/LavaSketch"
import KaleidoscopeSketch from "../p5/KaleidoscopeSketch"
import MyCv from "./MyCv"

// import { useTranslation } from "@/i18n/useTranslation"

export default function EntryPoint({ ...props }: TabComponentProps) {
  const createTab = useAddTab()
//   const { t } = useTranslation()
  return (
    <PoppingWindow {...props}>
        <p>Hello! I'm Martín</p>
        <p>A software developer with a passion for creating innovative solutions</p>
        <a href="" onClick={(e) => { e.preventDefault(); createTab(CellSketch, 'cell p5'); }}>cell p5</a>
        <br />
        <a href="" onClick={(e) => { e.preventDefault(); createTab(MyCv, 'my cv'); }}>my cv</a>
        <br />
        <a href="" onClick={(e) => { e.preventDefault(); createTab(LavaSketch, 'lava p5'); }}>lava p5</a>
        <br />
        <a href="" onClick={(e) => { e.preventDefault(); createTab(KaleidoscopeSketch, 'kaleidoscope p5'); }}>kaleidoscope p5</a>

    </PoppingWindow>
  )
}