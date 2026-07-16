import PoppingWindow from "@/components/commons/poping-window/PoppingWindow";
import TabCanvas from "@/components/commons/TabCanvas";
import movingFloorSketch from "@/p5/glsl/movingFloor.glsl";
import type { TabComponentProps } from "@/types/tab.types";
import { useTranslation } from "@/i18n/useTranslation";

export default function MovingFloor({ ...props }: TabComponentProps) {
  const { t } = useTranslation()
  return (
    <PoppingWindow {...props}>
      <TabCanvas sketch={movingFloorSketch} label={t("sketches.movingFloor")} />
    </PoppingWindow>
  )
}
