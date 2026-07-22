import { TAB_TYPES, type TabDefinition } from "../types/available-tabs/available-tab.types"

// contact me, miscellaneous
export const ENTRY_POINT_TABS = {
  MY_CV: {
    loader: () => import("@/components/tabs/main/MyCv").then((m) => m.default),
    i18key: "info.cv.title",
    type: TAB_TYPES.FILE,
    date: new Date("2026-06-23 08:50"),
    size: 18777,
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
  MY_TECHNOLOGIES: {
    loader: () =>
      import("@/components/tabs/main/MyTechnologies").then((m) => m.default),
    i18key: "info.technologies.title",
    type: TAB_TYPES.FILE,
    date: new Date("2026-07-05 18:57"),
    size: 2103,
  },
  CONTACT_ME: {
    loader: () =>
      import("@/components/tabs/main/ContactMe").then((m) => m.default),
    i18key: "info.contact.title",
    type: TAB_TYPES.FILE,
    date: new Date("2026-07-05 19:36"),
    size: 1500,
  },
  MISCELLANEOUS: {
    loader: () =>
      import("@/components/tabs/main/Miscellaneous").then((m) => m.default),
    i18key: "info.miscellaneous.title",
    type: TAB_TYPES.DIRECTORY,
    date: new Date("2026-07-05 20:00"),
    size: 966,
  },
} as const satisfies Record<string, TabDefinition>
