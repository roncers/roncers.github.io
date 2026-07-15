import PoppingWindow from "@/components/commons/poping-window/PoppingWindow";
import TabCanvas from "@/components/commons/tab-canvas/TabCanvas";
import romboidRainbowSketch from "@/p5/glsl/romboid-rainbow.glsl";
import type { TabComponentProps } from "@/types/tab.types";
import { useTranslation } from "@/i18n/useTranslation";

export default function RomboidRainbow({ ...props }: TabComponentProps) {
  const { t } = useTranslation()
  return (
    <PoppingWindow {...props}>
      <TabCanvas sketch={romboidRainbowSketch} label={t("sketches.romboidRainbow")} />
    </PoppingWindow>
  )
}