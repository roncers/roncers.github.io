import PoppingWindow from "@/components/commons/poping-window/PoppingWindow";
import TabCanvas from "@/components/commons/tab-canvas/TabCanvas";
import lavaSketch from "@/p5/lava.p5-sketch";
import type { TabComponentProps } from "@/types/tab.types";
import { useTranslation } from "@/i18n/useTranslation";

export default function LavaSketch({ ...props }: TabComponentProps) {
  const { t } = useTranslation()
  return (
    <PoppingWindow {...props}>
      <TabCanvas sketch={lavaSketch} label={t("sketches.lava")} />
    </PoppingWindow>
  )
}