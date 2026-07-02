import { TAB_TYPES, type TabDefinition } from "../commons.types"

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
    size: 888,
  },
} as const satisfies Record<string, TabDefinition>
