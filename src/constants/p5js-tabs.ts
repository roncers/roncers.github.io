import { TAB_TYPES } from "../types/available-tabs/available-tab.types"
import type { TabDefinition } from "../types/available-tabs/available-tab.types"

export const P5JS_TABS = {
  CELL_SKETCH: {
    loader: () =>
      import("@/components/tabs/generic/P5Canvas").then((m) => m.default),
    args: [() => import("@/p5/base/cell.p5").then((m) => m.default)],
    i18key: "sketches.cell",
    type: TAB_TYPES.SCRIPT,
    date: new Date("2026-03-29 18:23"),
    size: 1287,
  },
  KALEIDOSCOPE_SKETCH: {
    loader: () =>
      import("@/components/tabs/generic/P5Canvas").then((m) => m.default),
    args: [() => import("@/p5/base/kaleidoscope.p5").then((m) => m.default)],
    i18key: "sketches.kaleidoscope",
    type: TAB_TYPES.SCRIPT,
    date: new Date("2026-06-22 02:40"),
    size: 2677,
  },
} as const satisfies Record<string, TabDefinition>
