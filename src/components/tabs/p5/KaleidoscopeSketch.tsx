import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import TabCanvas from "@/components/commons/tab-canvas/TabCanvas"
import kaleidoscopeSketch from "@/p5/base/kaleidoscope.p5"
import type { TabComponentProps } from "@/types/tab.types"
import { useTranslation } from "@/i18n/useTranslation"

export default function KaleidoscopeSketch({ ...props }: TabComponentProps) {
  const { t } = useTranslation()
  return (
    <PoppingWindow {...props}>
      <TabCanvas sketch={kaleidoscopeSketch} label={t("sketches.kaleidoscope")} />
    </PoppingWindow>
  )
}