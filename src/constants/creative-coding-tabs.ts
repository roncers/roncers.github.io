import { TAB_TYPES } from "../types/available-tabs/available-tab.types"
import type { TabDefinition } from "../types/available-tabs/available-tab.types"

export const CREATIVE_CODING_TABS = {
  P5JS: {
    loader: () =>
      import("@/components/tabs/projects/P5js").then((m) => m.default),
    i18key: "creativeCoding.p5Scripts.title",
    type: TAB_TYPES.DIRECTORY,
    date: new Date("2026-11-02 21:04"),
    size: 1212,
  },
  GLSL: {
    loader: () =>
      import("@/components/tabs/projects/Glsl").then((m) => m.default),
    i18key: "creativeCoding.glsl.title",
    type: TAB_TYPES.DIRECTORY,
    date: new Date("2026-11-02 21:04"),
    size: 1223,
  },
} as const satisfies Record<string, TabDefinition>
