import PoppingWindow from "@/components/commons/poping-window/PoppingWindow";
import TabCanvas from "@/components/commons/TabCanvas";
import ringsZoomingSketch from "@/p5/glsl/rings-zooming.glsl";
import type { TabComponentProps } from "@/types/tab.types";
import { useTranslation } from "@/i18n/useTranslation";

export default function RingsZooming({ ...props }: TabComponentProps) {
  const { t } = useTranslation()
  return (
    <PoppingWindow {...props}>
      <TabCanvas sketch={ringsZoomingSketch} label={t("sketches.ringsZooming")} />
    </PoppingWindow>
  )
}