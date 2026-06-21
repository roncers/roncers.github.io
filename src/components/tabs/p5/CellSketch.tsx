

import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import TabCanvas from "@/components/commons/tab-canvas/TabCanvas"
import cellSketch from "@/p5/cell.p5-sketch"
import type { TabComponentProps } from "@/types/tab.types"
import { useTranslation } from "@/i18n/useTranslation"

export default function CellSketch({ ...props }: TabComponentProps) {
  const { t } = useTranslation()
  return (
    <PoppingWindow {...props}>
      <TabCanvas sketch={cellSketch} label={t("sketches.cell")} />
    </PoppingWindow>
  )
}