import { ENTRY_POINT_TABS } from "./constants/entry-point-tabs"
import { HELPER_TABS } from "./constants/helper-tabs"

export * from "./commons.types"
export * from "./constants/helper-tabs"
export * from "./constants/entry-point-tabs"
export * from "./constants/projects-tabs"
export * from "./constants/experience-tabs"
export * from "./constants/glsl-tabs"
export * from "./constants/p5js-tabs"
export * from "./constants/misc-tabs"

export type TabKey = keyof typeof ENTRY_POINT_TABS | keyof typeof HELPER_TABS
