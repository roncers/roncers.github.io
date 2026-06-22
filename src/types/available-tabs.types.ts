import EntryPoint from "@/components/tabs/main/EntryPoint"
import CellSketch from "@/components/tabs/p5/CellSketch"
import LavaSketch from "@/components/tabs/p5/LavaSketch"
import type { TabComponentProps } from "@/types/tab.types"
 
// TODO: Integrate in the real code, now this isn't being used, but will be useful as hell.
export const TAB_REGISTRY = {
  ENTRY_POINT: { component: EntryPoint, i18key: "info" },
  CELL_SKETCH:  { component: CellSketch,  i18key: "sketches" },
  LAVA_SKETCH:  { component: LavaSketch,  i18key: "sketches" },
} as const satisfies Record<string, {
  component: React.ComponentType<TabComponentProps>
  i18key: string
}>
 
export type TabKey = keyof typeof TAB_REGISTRY