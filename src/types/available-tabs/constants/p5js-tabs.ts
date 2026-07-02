import { TAB_TYPES } from "../commons.types"
import type { TabDefinition } from "../commons.types"

export const P5JS_TABS = {
  CELL_SKETCH: {
    loader: () =>
      import("@/components/tabs/p5/CellSketch").then((m) => m.default),
    i18key: "sketches.cell",
    type: TAB_TYPES.SCRIPT,
    date: new Date("2026-03-29 18:23"),
    size: 1287,
  },
  KALEIDOSCOPE_SKETCH: {
    loader: () =>
      import("@/components/tabs/p5/KaleidoscopeSketch").then((m) => m.default),
    i18key: "sketches.kaleidoscope",
    type: TAB_TYPES.SCRIPT,
    date: new Date("2026-06-22 02:40"),
    size: 2677,
  },
} as const satisfies Record<string, TabDefinition>
