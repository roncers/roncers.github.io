import { TAB_TYPES, type TabDefinition } from "../commons.types"
export const EXPERIENCE_TABS = {
  INDRA: {
    loader: () =>
      import("@/components/tabs/experience/Indra").then((m) => m.default),
    i18key: "info.experience.indra.title",
    type: TAB_TYPES.FILE,
    date: new Date("2026-06-28 22:40"),
    size: 1693,
  },
  NTT_DATA: {
    loader: () =>
      import("@/components/tabs/experience/NttData").then((m) => m.default),
    i18key: "info.experience.nttData.title",
    type: TAB_TYPES.FILE,
    date: new Date("2023-12-15 22:40"),
    size: 856,
  },
} as const satisfies Record<string, TabDefinition>
