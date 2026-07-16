import PoppingWindow from "@/components/commons/poping-window/PoppingWindow";
import TabCanvas from "@/components/commons/TabCanvas";
import lavaSketch from "@/p5/glsl/lava.glsl";
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