import type { TabDefinition } from "../commons.types"

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
