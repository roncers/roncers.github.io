import type React from "react"
import type { TabComponentProps } from "@/types/tab.types"

type TabLoader = () => Promise<React.ComponentType<TabComponentProps>>

export type TabDefinition = {
  loader: TabLoader
  i18key: string
  type: TabType
  date: Date
  size: number
}

function linkLoader(url: string): TabLoader {
  return () => {
    const a = document.createElement("a")
    a.href = url
    a.target = "_blank"
    a.rel = "noopener noreferrer"
    a.click()
    return Promise.resolve(() => null)
  }
}

export const TAB_TYPES = {
  FILE: "file",
  SCRIPT: "script",
  DIRECTORY: "directory",
  LINK: "link",
  VIDEO: "video",
} as const

// -- Tabs --

export type TabType = (typeof TAB_TYPES)[keyof typeof TAB_TYPES]
export const HELPER_TABS = {
  ENTRY_POINT: {
    loader: () =>
      import("@/components/tabs/main/EntryPoint").then((m) => m.default),
    i18key: "info.title",
    type: "directory",
    date: new Date("2026-06-23 17:23"),
    size: 1081,
  },
} as const satisfies Record<string, TabDefinition>

// my experience, my projects, my skills, contact me, miscellaneous
export const ENTRY_POINT_TABS = {
  MY_CV: {
    loader: () => import("@/components/tabs/main/MyCv").then((m) => m.default),
    i18key: "info.cv.title",
    type: TAB_TYPES.FILE,
    date: new Date("2026-06-23 08:50"),
    size: 38831,
  },
  MY_PROJECTS: {
    loader: () =>
      import("@/components/tabs/main/MyProjects").then((m) => m.default),
    i18key: "info.projects.title",
    type: TAB_TYPES.DIRECTORY,
    date: new Date("2026-06-28 02:25"),
    size: 870,
  },
  MY_EXPERIENCE: {
    loader: () =>
      import("@/components/tabs/main/MyExperience").then((m) => m.default),
    i18key: "info.experience.title",
    type: TAB_TYPES.DIRECTORY,
    date: new Date("2026-06-28 22:40"),
    size: 870,
  },
} as const satisfies Record<string, TabDefinition>

export const PROJECTS_TABS = {
  PHRASE_RANDOMIZER: {
    loader: linkLoader("https://martin-roncero.com/word-randomizer"),
    i18key: "info.projects.phraseRandomizer",
    type: TAB_TYPES.LINK,
    date: new Date("2026-06-03 22:24"),
    size: 3687,
  },
  UML_EDITOR: {
    loader: linkLoader("https://martin-roncero.com/uml-editor"),
    i18key: "info.projects.umlEditor",
    type: TAB_TYPES.LINK,
    date: new Date("2026-01-03 14:00"),
    size: 3380,
  },
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
} as const satisfies Record<string, TabDefinition>

export const EXPERIENCE_TABS = {
  INDRA: {
    loader: linkLoader("https://www.indra.com/en"),
    i18key: "info.experience.indra",
    type: TAB_TYPES.DIRECTORY,
    date: new Date("2026-06-28 22:40"),
    size: 0,
  },
  NTT_DATA: {
    loader: linkLoader("https://www.nttdata.com/es"),
    i18key: "info.experience.nttData",
    type: TAB_TYPES.DIRECTORY,
    date: new Date("2026-06-28 22:40"),
    size: 0,
  },
} as const satisfies Record<string, TabDefinition>

export type TabKey = keyof typeof ENTRY_POINT_TABS | keyof typeof HELPER_TABS
export type TabEntry = TabDefinition & { label: string }
