import { TAB_TYPES } from "../types/available-tabs/available-tab.types"
import type { TabDefinition } from "../types/available-tabs/available-tab.types"

export const GLSL_TABS = {
  LAVA_SKETCH: {
    loader: () =>
      import("@/components/tabs/generic/P5Canvas").then((m) => m.default),
    args: [() => import("@/p5/glsl/lava.glsl").then((m) => m.default)],
    i18key: "sketches.lava",
    type: TAB_TYPES.SHADER,
    date: new Date("2026-06-14 00:23"),
    size: 1194,
  },
  RINGS_ZOOMING: {
    loader: () =>
      import("@/components/tabs/generic/P5Canvas").then((m) => m.default),
    args: [() => import("@/p5/glsl/rings-zooming.glsl").then((m) => m.default)],
    i18key: "sketches.ringsZooming",
    type: TAB_TYPES.SHADER,
    date: new Date("2026-07-02 19:50"),
    size: 1474,
  },
  MOVING_FLOOR: {
    loader: () =>
      import("@/components/tabs/generic/P5Canvas").then((m) => m.default),
    args: [() => import("@/p5/glsl/moving-floor.glsl").then((m) => m.default)],
    i18key: "sketches.movingFloor",
    type: TAB_TYPES.SHADER,
    date: new Date("2026-07-12 13:50"),
    size: 1574,
  },
  ROMBOID_RAINBOW: {
    loader: () =>
      import("@/components/tabs/generic/P5Canvas").then((m) => m.default),
    args: [() => import("@/p5/glsl/romboid-rainbow.glsl").then((m) => m.default)],
    i18key: "sketches.romboidRainbow",
    type: TAB_TYPES.SHADER,
    date: new Date("2026-07-15 18:39"),
    size: 2494,
  },
  SPINNER: {
    loader: () =>
      import("@/components/tabs/generic/P5Canvas").then((m) => m.default),
    args: [() => import("@/p5/glsl/spinner.glsl").then((m) => m.default)],
    i18key: "sketches.spinner",
    type: TAB_TYPES.SHADER,
    date: new Date("2026-07-15 18:39"),
    size: 2494,
  },
} as const satisfies Record<string, TabDefinition>
