import { TAB_TYPES, type TabDefinition } from "../commons.types"

export const GALLERY_TABS = {
  ME: {
    loader: () => import("@/components/tabs/misc/SpeechesList").then((m) => m.default),
    i18key: "info.miscellaneous.gallery.me",
    type: TAB_TYPES.IMAGE,
    date: new Date("2026-07-15 20:56"),
    size: 999,
  },
} as const satisfies Record<string, TabDefinition>
