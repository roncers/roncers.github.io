import { TAB_TYPES, type TabDefinition } from "../available-tab.types"

export const MISC_TABS = {
  SPEECHES: {
    loader: () => import("@/components/tabs/misc/SpeechesList").then((m) => m.default),
    i18key: "info.miscellaneous.speeches.title",
    type: TAB_TYPES.DIRECTORY,
    date: new Date("2026-07-12 17:50"),
    size: 999,
  },
  MY_TEXTS: {
    loader: () => import("@/components/tabs/misc/MyTexts").then((m) => m.default),
    i18key: "info.miscellaneous.myTexts.title",
    type: TAB_TYPES.DIRECTORY,
    date: new Date("2026-07-13 19:26"),
    size: 982,
  },
  CLOCK: {
    loader: () => import("@/components/tabs/misc/Clock").then((m) => m.default),
    i18key: "info.miscellaneous.clock.title",
    type: TAB_TYPES.FILE,
    date: new Date("2026-07-13 20:36"),
    size: 692,
  },
  GALLERY: {
    loader: () => import("@/components/tabs/misc/Gallery").then((m) => m.default),
    i18key: "info.miscellaneous.gallery.title",
    type: TAB_TYPES.DIRECTORY,
    date: new Date("2026-07-13 20:51"),
    size: 999,
  },
} as const satisfies Record<string, TabDefinition>
