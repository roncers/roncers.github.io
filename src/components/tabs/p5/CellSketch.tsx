import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import TabCanvas from "@/components/commons/TabCanvas"
import cellSketch from "@/p5/base/cell.p5"
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