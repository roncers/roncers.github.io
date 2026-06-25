import type React from "react"
import type { TabComponentProps } from "@/types/tab.types"

type TabLoader = () => Promise<React.ComponentType<TabComponentProps>>
export const TAB_TYPES = {
  FILE: "file",
  SCRIPT: "script",
  DIRECTORY: "directory",
  LINK: "link",
} as const

export type TabType = (typeof TAB_TYPES)[keyof typeof TAB_TYPES]
export const HELPER_TABS = {
  ENTRY_POINT: {
    loader: () =>
      import("@/components/tabs/main/EntryPoint").then((m) => m.default),
    i18key: "info.title",
    type: "directory",
    date: new Date("2026-06-23 17:23"),
    size: 1081,
  }
} as const satisfies Record<
  string,
  {
    loader: TabLoader
    i18key: string
    type: TabType
    date: Date
    size: number
  }
>
export const ENTRY_POINT_TABS = {
  CELL_SKETCH: {
    loader: () =>
      import("@/components/tabs/p5/CellSketch").then((m) => m.default),
    i18key: "sketches.cell",
    type: TAB_TYPES.SCRIPT,
    date: new Date("2026-03-29 18:23"),
    size: 1287,
  },
  LAVA_SKETCH: {
    loader: () =>
      import("@/components/tabs/p5/LavaSketch").then((m) => m.default),
    i18key: "sketches.lava",
    type: TAB_TYPES.SCRIPT,
    date: new Date("2026-06-14 00:23"),
    size: 1194,
  },
  KALEIDOSCOPE_SKETCH: {
    loader: () =>
      import("@/components/tabs/p5/KaleidoscopeSketch").then((m) => m.default),
    i18key: "sketches.kaleidoscope",
    type: TAB_TYPES.SCRIPT,
    date: new Date("2026-06-22 02:40"),
    size: 2677,
  },
  MY_CV: {
    loader: () => import("@/components/tabs/main/MyCv").then((m) => m.default),
    i18key: "info.cv.title",
    type: TAB_TYPES.FILE,
    date: new Date("2026-06-23 08:50"),
    size: 38831,
  },
} as const satisfies Record<
  string,
  {
    loader: TabLoader
    i18key: string
    type: TabType
    date: Date
    size: number
  }
>

export type TabKey = keyof typeof ENTRY_POINT_TABS | keyof typeof HELPER_TABS
export type TabEntry = (
  | (typeof ENTRY_POINT_TABS)[keyof typeof ENTRY_POINT_TABS]
  | (typeof HELPER_TABS)[keyof typeof HELPER_TABS]
) & { label: string }
