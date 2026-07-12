import { TAB_TYPES, type TabDefinition } from "../commons.types"

// TODO: Put the size
export const MISC_TABS = {
  SPEECHES: {
    loader: () => import("@/components/tabs/misc/SpeechesList").then((m) => m.default),
    i18key: "info.miscellaneous.speeches.title",
    type: TAB_TYPES.DIRECTORY,
    date: new Date("2026-07-12 17:50"),
    size: 276,
  },
} as const satisfies Record<string, TabDefinition>
